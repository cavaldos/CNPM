import { Request, Response } from "express";
import LessonRepository from "../repositories/lesson";

const LessonController = {
    createLessonVideo: async (req: Request, res: Response) => {
        try {
            const { title, duration, complexityLevel, lessonType, ordinal, courseID, url } = req.body;
            const result = await LessonRepository.createLessonVideo(
                title,
                duration,
                complexityLevel,
                lessonType,
                ordinal,
                courseID,
                url
            );
            res.status(201).json({
                success: true,
                message: "Lesson video created successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create lesson video",
                error: error
            });
        }
    },

    updateLessonVideo: async (req: Request, res: Response) => {
        try {
            const { lessonVideoID, url } = req.body;
            const result = await LessonRepository.updateLessonVideo(lessonVideoID, url);
            res.status(200).json({
                success: true,
                message: "Lesson video updated successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update lesson video",
                error: error
            });
        }
    },

    deleteLesson: async (req: Request, res: Response) => {
        try {
            const { lessonID } = req.body;
            const result = await LessonRepository.deleteLesson(lessonID);
            res.status(200).json({
                success: true,
                message: "Lesson deleted successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete lesson",
                error: error
            });
        }
    },

    getAllLessons: async (_req: Request, res: Response) => {
        try {
            const result = await LessonRepository.getAllLessons();
            res.status(200).json({
                success: true,
                message: "All lessons retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get all lessons",
                error: error
            });
        }
    },

    getLessonByID: async (req: Request, res: Response) => {
        try {
            const { lessonID } = req.body;
            const result = await LessonRepository.getLessonByID(lessonID);
            res.status(200).json({
                success: true,
                message: "Lesson retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get lesson",
                error: error
            });
        }
    }
};

export default LessonController;
