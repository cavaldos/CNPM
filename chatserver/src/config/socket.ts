import { Server } from "socket.io";
import portfinder from "portfinder";

interface Message {
    content: string;
    senderId: string;
    receiverId?: string;
    groupId?: string;
    timestamp: Date;
}

interface Player {
    id: string;
    name: string;
    isReady: boolean;
    joinedAt: Date;
}

interface GameRoom {
    id: string;
    players: Map<string, Player>;
    status: "waiting" | "playing" | "ended";
}

const startSocketServer = async (port: number) => {
    try {
        const freePort = await portfinder.getPortPromise({ port });
        const io = new Server(freePort, {
            cors: {
                origin: "*",
            },
        });

        const users = new Map<string, string>(); // userId -> socketId
        const groups = new Map<string, Set<string>>(); // groupId -> Set of userIds
        const gameRooms = new Map<string, GameRoom>();

        io.on("connection", (socket) => {
            console.log("New client connected:", socket.id);

            // Đăng ký user
            socket.on("register", (userId: string) => {
                users.set(userId, socket.id);
                console.log(`User ${userId} registered with socket ID ${socket.id}`);
            });

            // Join vào group
            socket.on("joinGroup", ({ userId, groupId }) => {
                if (!groups.has(groupId)) {
                    groups.set(groupId, new Set());
                }
                groups.get(groupId)?.add(userId);
                console.log(`User ${userId} joined group ${groupId}`);
            });

            // Rời group
            socket.on("leaveGroup", ({ userId, groupId }) => {
                groups.get(groupId)?.delete(userId);
                console.log(`User ${userId} left group ${groupId}`);
            });

            // Xử lý tin nhắn private
            socket.on("privateMessage", (msg: Message) => {
                const { senderId, receiverId, content } = msg;
                console.log("Private message:", msg);

                const receiverSocketId = users.get(receiverId!);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("privateMessage", {
                        ...msg,
                        timestamp: new Date(),
                    });
                }
            });

            // Xử lý tin nhắn group
            socket.on("groupMessage", (msg: Message) => {
                const { senderId, groupId, content } = msg;
                console.log("Group message:", msg);

                const groupMembers = groups.get(groupId!);
                if (groupMembers) {
                    groupMembers.forEach((userId) => {
                        const memberSocketId = users.get(userId);
                        if (memberSocketId && userId !== senderId) {
                            io.to(memberSocketId).emit("groupMessage", {
                                ...msg,
                                timestamp: new Date(),
                            });
                        }
                    });
                }
            });

            // Game handlers
            socket.on("createGameRoom", (roomId: string) => {
                if (!gameRooms.has(roomId)) {
                    gameRooms.set(roomId, {
                        id: roomId,
                        players: new Map(),
                        status: "waiting",
                    });
                    socket.join(roomId);
                    console.log(`Game room ${roomId} created`);
                }
            });

            socket.on(
                "joinGame",
                ({ roomId, player }: { roomId: string; player: Player }) => {
                    const room = gameRooms.get(roomId);
                    if (room) {
                        room.players.set(player.id, {
                            ...player,
                            joinedAt: new Date(),
                        });
                        socket.join(roomId);

                        // Broadcast updated player list to all players in room
                        io.to(roomId).emit(
                            "playerListUpdate",
                            Array.from(room.players.values())
                        );
                        console.log(`Player ${player.name} joined room ${roomId}`);
                    }
                }
            );

            socket.on(
                "leaveGame",
                ({ roomId, playerId }: { roomId: string; playerId: string }) => {
                    const room = gameRooms.get(roomId);
                    if (room) {
                        room.players.delete(playerId);
                        socket.leave(roomId);

                        // Broadcast updated player list
                        io.to(roomId).emit(
                            "playerListUpdate",
                            Array.from(room.players.values())
                        );
                        console.log(`Player ${playerId} left room ${roomId}`);

                        // Delete room if empty
                        if (room.players.size === 0) {
                            gameRooms.delete(roomId);
                            console.log(`Room ${roomId} deleted - no players remaining`);
                        }
                    }
                }
            );

            socket.on(
                "toggleReady",
                ({ roomId, playerId }: { roomId: string; playerId: string }) => {
                    const room = gameRooms.get(roomId);
                    if (room) {
                        const player = room.players.get(playerId);
                        if (player) {
                            player.isReady = !player.isReady;
                            io.to(roomId).emit(
                                "playerListUpdate",
                                Array.from(room.players.values())
                            );
                        }
                    }
                }
            );

            socket.on("disconnect", () => {
                console.log("Client disconnected:", socket.id);
                // Xóa user khỏi users map
                for (const [userId, socketId] of users.entries()) {
                    if (socketId === socket.id) {
                        users.delete(userId);
                        // Xóa user khỏi tất cả groups
                        groups.forEach((members) => members.delete(userId));
                        break;
                    }
                }
            });
        });

        console.log(
            `\n 💬 Socket.io server running at http://localhost:${freePort}`
        );
    } catch (err) {
        console.error("Error finding free port:", err);
    }
};

export default startSocketServer;