import express from "express";
import { sendMessage, getConversation, deleteMessage } from "../controllers/message.co";

const MessageRouter = express.Router();

// Gửi tin nhắn mới
MessageRouter.post("/send", sendMessage);

// Lấy cuộc trò chuyện giữa hai người dùng
MessageRouter.post("/conversation", getConversation);

// Xóa tin nhắn (chỉ xóa được tin nhắn của mình)
MessageRouter.post("/delete", deleteMessage);

export default MessageRouter;