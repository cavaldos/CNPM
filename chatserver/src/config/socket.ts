import { Server } from "socket.io";
import portfinder from "portfinder";
import express from "express";
import http from "http";

interface Message {
    content: string;
    senderId: string;
    receiverId: string;
}

const startSocketServer = async (port: number) => {
    try {
        const freePort = await portfinder.getPortPromise({ port });

        // Tạo HTTP server với Express
        const app = express();
        const server = http.createServer(app);

        // Tạo Socket.IO server từ HTTP server
        const io = new Server(server, {
            cors: {
                origin: "*",
            },
        });

        let hasConnection = false;
        const users = new Map<string, string>(); // Lưu trữ mapping từ userId đến socketId

        io.on("connection", (socket) => {
            hasConnection = true;
            console.log("New client connected:", socket.id);

            socket.on("initialize", (data) => {
                const userId = data.id;
                users.set(userId, socket.id);
                console.log(`User ${userId} registered with socket ID ${socket.id}`);
            });

            socket.on("register", (userId) => {
                users.set(userId, socket.id);
                console.log(`User ${userId} registered with socket ID ${socket.id}`);
            });

            socket.on("send", (data) => {
                const { recipientId } = data;
                console.log(`Signal received for ${recipientId}`);
                try {
                    const receiverSocketId = users.get(recipientId);
                    if (receiverSocketId) {
                        io.to(receiverSocketId).emit("receive", { incrementCount: true });
                    }
                } catch (err) {
                    console.error("Error sending signal:", err);
                }
            });

            socket.on("message", (msg: Message) => {
                const { senderId, receiverId } = msg;
                console.log("Message received:", msg, senderId);
                try {
                    const receiverSocketId = users.get(receiverId);
                    if (receiverSocketId) {
                        io.to(receiverSocketId).emit("message", msg);
                    }
                } catch (err) {
                    console.error("Error sending message:", err);
                }
            });

            socket.on("disconnect", () => {
                console.log("Client disconnected:", socket.id);
                // Xóa user khỏi map khi socket ngắt kết nối
                for (const [userId, socketId] of users.entries()) {
                    if (socketId === socket.id) {
                        users.delete(userId);
                        hasConnection = users.size > 0;
                        break;
                    }
                }
            });
        });

        // Khởi động HTTP server
        server.listen(freePort, () => {
            console.log(`\n 💬 Socket.io server running at http://localhost:${freePort}`);
        });

        // Hàm kiểm tra kết nối và log
        const checkConnections = () => {
            if (hasConnection) {
                console.log(`Active connections: ${users.size}`);
                if (users.size === 0) {
                    console.log("waiting for connections to close...");
                }
            }
        };

        // Thiết lập interval để kiểm tra kết nối
        setInterval(checkConnections, 100000); // Kiểm tra mỗi 100 giây
    } catch (err) {
        console.error("Error finding free port:", err);
    }
};

export default startSocketServer;