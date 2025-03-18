import express from "express";
import {
  sendMessage,
  getConversation,
  getUserMessages,
  markAsRead,
  getUnreadMessageCount
} from "../controllers/message.co";

const MessageRouter = express.Router();

// Send a new message
MessageRouter.post("/", sendMessage);

// Get conversation between two users
MessageRouter.post("/conversation/:user1Id/:user2Id", getConversation);

// Get all messages for a user
MessageRouter.post("/user/:userId", getUserMessages);

// Mark a message as read
MessageRouter.post("/read/:messageId", markAsRead);

// Get unread message count for a user
MessageRouter.post("/unread/:userId", getUnreadMessageCount);

export default MessageRouter;