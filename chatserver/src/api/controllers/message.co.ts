import { Request, Response } from "express";
import MessageRepo from "../repository/message.repo";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { sender, receiver, content } = req.body;

    // Validate input
    if (!sender || !receiver || !content) {
      return res.status(400).json({
        success: false,
        message: "Sender, receiver, and content are required",
      });
    }

    // Validate sender ObjectID only
    if (!MessageRepo.isValidObjectId(sender)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sender ID",
      });
    }

    const newMessage = await MessageRepo.createMessage(sender, receiver, content);

    return res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

export const getConversation = async (req: Request, res: Response) => {
  try {
    const { user1Id, user2Id } = req.body;

    // Validate sender ObjectID only
    if (!MessageRepo.isValidObjectId(user1Id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user1Id",
      });
    }

    // Get messages between these two users
    const messages = await MessageRepo.getConversation(user1Id, user2Id);

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Error getting conversation:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get conversation",
      error: error.message,
    });
  }
};

export const getUserMessages = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    // Validate sender ObjectID only
    if (!MessageRepo.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Get all messages where user is sender or receiver
    const messages = await MessageRepo.getUserMessages(userId);

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Error getting user messages:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get user messages",
      error: error.message,
    });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { messageId } = req.body;

    // Validate ObjectID
    if (!MessageRepo.isValidObjectId(messageId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const message = await MessageRepo.markMessageAsRead(messageId);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error("Error marking message as read:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to mark message as read",
      error: error.message,
    });
  }
};

export const getUnreadMessageCount = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    // Validate ObjectID
    if (!MessageRepo.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const count = await MessageRepo.getUnreadCount(userId);

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Error getting unread message count:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get unread message count",
      error: error.message,
    });
  }
};

export const getConversationPartners = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    // Validate ObjectID
    if (!MessageRepo.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const partners = await MessageRepo.getConversationPartners(userId);

    return res.status(200).json({
      success: true,
      data: partners,
    });
  } catch (error) {
    console.error("Error getting conversation partners:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get conversation partners",
      error: error.message,
    });
  }
};