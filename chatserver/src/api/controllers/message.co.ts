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
    const { sender, receiver } = req.body;

    // Validate input
    if (!sender || !receiver) {
      return res.status(400).json({
        success: false,
        message: "Both sender and receiver IDs are required",
        data: []
      });
    }
    // Validate ObjectIDs
    if (!MessageRepo.isValidObjectId(sender) || !MessageRepo.isValidObjectId(receiver)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format",
        data: [],
      });
    }
    const reverse = (array: any[]) => {
      return array.map(item => ({
        _id: item._id,
        sender: item.receiver,
        receiver: item.sender,
        content: item.content,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        isRead: item.isRead,
      }));
    }

    let result: any[] = [];
    const messages = await MessageRepo.getConversation(sender, receiver);

    // Check if the messages array is empty
    if (messages.length === 0) {
      return res.status(200).json({
        success: true,
        sum: 0,
        data: [],
      });
    }

    if (sender == messages[0].sender) {
      result = messages;

    } else {
      result = reverse(messages);
    }

    return res.status(200).json({
      success: true,
      sum: result.length,
      data: result,
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

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { messageId, userId } = req.body;

    // Validate input
    if (!messageId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Message ID and user ID are required",
      });
    }

    // Validate ObjectIDs
    if (!MessageRepo.isValidObjectId(messageId) || !MessageRepo.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    // Attempt to delete message
    const deletedMessage = await MessageRepo.deleteMessage(messageId, userId);

    if (!deletedMessage) {
      return res.status(403).json({
        success: false,
        message: "Message not found or you don't have permission to delete it",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      data: deletedMessage,
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
      error: error.message,
    });
  }
};