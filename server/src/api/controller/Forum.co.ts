import { Request, Response } from "express";
import ForumRepository from "../repositories/forum";

const ForumController = {
    createMessage: async (req: Request, res: Response) => {
        try {
            const { content, courseID, userID } = req.body;
            const result = await ForumRepository.createForumMessage(
                content,
                courseID,
                userID
            );
            res.status(201).json({
                success: true,
                message: "Forum message created successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create forum message",
                error: error
            });
        }
    },

    updateMessage: async (req: Request, res: Response) => {
        try {
            const { forumMessageID, content } = req.body;
            const result = await ForumRepository.updateForumMessage(
                forumMessageID,
                content
            );
            res.status(200).json({
                success: true,
                message: "Forum message updated successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update forum message",
                error: error
            });
        }
    },

    deleteMessage: async (req: Request, res: Response) => {
        try {
            const { forumMessageID } = req.body;
            const result = await ForumRepository.deleteForumMessage(forumMessageID);
            res.status(200).json({
                success: true,
                message: "Forum message deleted successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete forum message",
                error: error
            });
        }
    },

    getMessagesByCourse: async (req: Request, res: Response) => {
        try {
            const { courseID } = req.body;
            const result = await ForumRepository.getForumMessagesByCourse(courseID);
            res.status(200).json({
                success: true,
                message: "Course forum messages retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get course forum messages",
                error: error
            });
        }
    },

    getMessagesByUser: async (req: Request, res: Response) => {
        try {
            const { userID } = req.body;
            const result = await ForumRepository.getForumMessagesByUser(userID);
            res.status(200).json({
                success: true,
                message: "User forum messages retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get user forum messages",
                error: error
            });
        }
    },

    getLatestMessages: async (req: Request, res: Response) => {
        try {
            const { limit } = req.body;
            const result = await ForumRepository.getLatestMessages(limit);
            res.status(200).json({
                success: true,
                message: "Latest forum messages retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get latest forum messages",
                error: error
            });
        }
    },

    getMessageCount: async (req: Request, res: Response) => {
        try {
            const { courseID } = req.body;
            const result = await ForumRepository.getMessageCount(courseID);
            res.status(200).json({
                success: true,
                message: "Forum message count retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get forum message count",
                error: error
            });
        }
    },

    getAllMessages: async (_req: Request, res: Response) => {
        try {
            const result = await ForumRepository.getAllMessages();
            res.status(200).json({
                success: true,
                message: "All forum messages retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get all forum messages",
                error: error
            });
        }
    }
};

export default ForumController;