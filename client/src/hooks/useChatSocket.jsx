import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5003"); // Cập nhật port cho Socket.io

const useChatSocket = (userId) => {
    const [groupMessages, setGroupMessages] = useState([]);
    const [privateMessages, setPrivateMessages] = useState([]);

    useEffect(() => {
        if (userId) {
            socket.emit("register", userId);
        }

        socket.on("privateMessage", (msg) => {
            setPrivateMessages((prev) => [...prev, msg]);
        });

        socket.on("groupMessage", (msg) => {
            setGroupMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off("privateMessage");
            socket.off("groupMessage");
        };
    }, [userId]);

    const sendPrivateMessage = (content, receiverId) => {
        if (content.trim() && userId && receiverId) {
            const message = {
                content,
                senderId: userId,
                receiverId,
                timestamp: new Date(),
            };
            socket.emit("privateMessage", message);
            setPrivateMessages((prev) => [...prev, message]);
            return message;
        }
        return null;
    };

    const sendGroupMessage = (content, groupId) => {
        if (content.trim() && userId && groupId) {
            const message = {
                content,
                senderId: userId,
                groupId,
                timestamp: new Date(),
            };
            socket.emit("groupMessage", message);
            setGroupMessages((prev) => [...prev, message]);
            return message;
        }
        return null;
    };

    const joinGroup = (groupId) => {
        socket.emit("joinGroup", { userId, groupId });
    };

    const leaveGroup = (groupId) => {
        socket.emit("leaveGroup", { userId, groupId });
    };

    return {
        privateMessages,
        groupMessages,
        sendPrivateMessage,
        sendGroupMessage,
        joinGroup,
        leaveGroup,
    };
};

export default useChatSocket;