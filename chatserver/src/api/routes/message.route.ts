import express from "express";
import {
  sendMessage,
  getConversation,
  getUserMessages,
  markAsRead,
  getUnreadMessageCount,
  getConversationPartners
} from "../controllers/message.co";

const MessageRouter = express.Router();

// Send a new message
MessageRouter.post("/send", sendMessage);

// Get conversation between two users
MessageRouter.post("/conversation", getConversation);

// Get all messages for a user
MessageRouter.post("/user", getUserMessages);

// Mark a message as read
MessageRouter.post("/read", markAsRead);

// Get unread message count for a user
MessageRouter.post("/unread", getUnreadMessageCount);

// Get list of users that have exchanged messages with the given user
MessageRouter.post("/partners", getConversationPartners);

export default MessageRouter;