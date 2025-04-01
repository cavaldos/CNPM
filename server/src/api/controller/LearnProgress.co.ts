import { Request, Response } from "express";
import LearnProgressRepository from "../repositories/learnProgress.repo";

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
            const { studentID, lessonID, processStatus } = req.body;
            console.log("Received data: ", req.body);
            // Validate processStatus
            const validStatuses = ["NotStarted", "InProcess", "Done"];
            if (!validStatuses.includes(processStatus)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid processStatus. Must be NotStarted, InProcess, or Done"
                });
            }

            const result = await LearnProgressRepository.updateLearnProgress(
                studentID,
                lessonID,
                processStatus
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
            let completionPercentage = 0;
            if (result && Array.isArray(result) && result.length > 0) {
                const totalLessons = result.length;
                const completedLessons = result.filter(lesson =>
                    lesson.ProcessStatus === "Done").length;
                completionPercentage = totalLessons > 0 ?
                    Math.round((completedLessons / totalLessons) * 100) : 0;
            }
            console.log("Completion Percentage: ", completionPercentage);

            res.status(200).json({
                success: true,
                message: "All lessons in progress retrieved successfully",
                completionPercentage: completionPercentage,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get all lessons in progress",
                error: error
            });
        }
    },
    completeCourseProgress: async (req: Request, res: Response) => {
        try {
            const { enrollmentID } = req.body;

            const result = await LearnProgressRepository.updateCourceProgress(
                enrollmentID
            );
            res.status(200).json({
                success: true,
                message: "Course progress updated successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update course progress",
                error: error
            });
        }
    }
    ,

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
