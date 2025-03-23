import { Request, Response } from "express";
import LearnProgressRepository from "../repositories/learnProgress";

const LearnProgressController = {
    startLearnProgress: async (req: Request, res: Response) => {
        try {
            const { lessonID, studentID } = req.body;
            const result = await LearnProgressRepository.startLearnProgress(
                lessonID,
                studentID
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
            const { progressID, processStatus } = req.body;

            // Validate processStatus
            const validStatuses = ["NotStarted", "InProcess", "Done"];
            if (!validStatuses.includes(processStatus)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid processStatus. Must be NotStarted, InProcess, or Done"
                });
            }

            const result = await LearnProgressRepository.updateLearnProgress(
                progressID,
                processStatus,
            );
            return res.status(200).json({
                success: true,
                message: "Learn progress updated successfully",
                data: result
            });
        } catch (error) {
            return res.status(500).json({
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
    },
    getAllLessonInProgress: async (req: Request, res: Response) => {
        try {
            const { enrollmentID } = req.body;
            const result = await LearnProgressRepository.getAllLessonInProgress(enrollmentID);

            // Calculate completion percentage
            if (result && result[0] && Array.isArray(result[0])) {
                const totalLessons = result[0].length;
                const completedLessons = result[0].filter(lesson =>
                    lesson.ProcessStatus === "Done").length;
                const completionPercentage = totalLessons > 0 ?
                    Math.round((completedLessons / totalLessons) * 100) : 0;

                res.status(200).json({
                    success: true,
                    message: "All lessons in progress retrieved successfully",
                    data: result,
                    completionPercentage: completionPercentage
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "All lessons in progress retrieved successfully",
                    data: result,
                    completionPercentage: 0
                });
            }
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get all lessons in progress",
                error: error
            });
        }
    },

    getAllCourseProgressEnrolled: async (req: Request, res: Response) => {
        try {
            const { studentID } = req.body;
            const result = await LearnProgressRepository.getAllCourseProgress(studentID);
            res.status(200).json({
                success: true,
                message: "All course progress records retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get all course progress records",
                error: error
            });
        }
    },
    getAllCourseProgress: async (req: Request, res: Response) => {
        try {
            const { studentID } = req.body;
            const result = await LearnProgressRepository.getAllCourseProgress(studentID);
            res.status(200).json({
                success: true,
                message: "All course progress records retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get all course progress records",
                error: error
            });
        }
    },
    checkProcessStatus: async (req: Request, res: Response) => {
        try {
            const { lessonID, studentID } = req.body;
            const result = await LearnProgressRepository.checkProcessStatus(
                lessonID,
                studentID
            );
            res.status(200).json({
                success: true,
                message: "Process status retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get process status",
                error: error
            });
        }
    },


};

export default LearnProgressController;
