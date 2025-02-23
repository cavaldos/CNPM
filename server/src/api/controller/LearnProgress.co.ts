import { Request, Response } from "express";
import LearnProgressRepository from "../repositories/learn_progress";

const LearnProgressController = {
    createLearnProgress: async (req: Request, res: Response) => {
        try {
            const { studentID, lessonID, processStatus, startTime, completionTime } = req.body;
            const result = await LearnProgressRepository.createLearnProgress(
                studentID,
                lessonID,
                processStatus,
                startTime,
                completionTime
            );
            res.status(201).json({
                success: true,
                message: "Learn progress created successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create learn progress",
                error: error
            });
        }
    },

    updateLearnProgress: async (req: Request, res: Response) => {
        try {
            const { progressID, processStatus, startTime, completionTime } = req.body;
            const result = await LearnProgressRepository.updateLearnProgress(
                progressID,
                processStatus,
                startTime,
                completionTime
            );
            res.status(200).json({
                success: true,
                message: "Learn progress updated successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update learn progress",
                error: error
            });
        }
    },

    deleteLearnProgress: async (req: Request, res: Response) => {
        try {
            const { progressID } = req.body;
            const result = await LearnProgressRepository.deleteLearnProgress(progressID);
            res.status(200).json({
                success: true,
                message: "Learn progress deleted successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete learn progress",
                error: error
            });
        }
    }
};

export default LearnProgressController;
