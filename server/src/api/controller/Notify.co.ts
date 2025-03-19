import { Request, Response } from "express";
import NotifyRepository from "../repositories/notify";

const NotifyController = {
    createNotify: async (req: Request, res: Response) => {
        try {
            const { messageNotify, statusNotify, receiveUserID } = req.body;
            const result = await NotifyRepository.createNotify(
                messageNotify,
                statusNotify,
                receiveUserID
            );
            res.status(201).json({
                success: true,
                message: "Notification created successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create notification",
                error: error
            });
        }
    },

    updateNotify: async (req: Request, res: Response) => {
        try {
            const { notifyID, messageNotify, statusNotify } = req.body;
            const result = await NotifyRepository.updateNotify(
                notifyID,
                messageNotify,
                statusNotify
            );
            res.status(200).json({
                success: true,
                message: "Notification updated successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update notification",
                error: error
            });
        }
    },

    deleteNotify: async (req: Request, res: Response) => {
        try {
            const { notifyID } = req.body;
            const result = await NotifyRepository.deleteNotify(notifyID);
            res.status(200).json({
                success: true,
                message: "Notification deleted successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete notification",
                error: error
            });
        }
    },

    getAllNotifications: async (_req: Request, res: Response) => {
        try {
            const result = await NotifyRepository.getAllNotifications();
            res.status(200).json({
                success: true,
                message: "All notifications retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get all notifications",
                error: error
            });
        }
    },

    getNotificationsByUser: async (req: Request, res: Response) => {
        try {
            const { userID } = req.body;
            const result = await NotifyRepository.getNotificationsByUser(userID);
            res.status(200).json({
                success: true,
                message: "User notifications retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get user notifications",
                error: error
            });
        }
    }
};

export default NotifyController;