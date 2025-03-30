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
                lessonType || "Video",
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

    createLessonDocument: async (req: Request, res: Response) => {
        try {
            const { title, duration, complexityLevel, lessonType, ordinal, documentContent, courseID } = req.body;
            const result = await LessonRepository.createLessonDocument(
                title,
                duration,
                complexityLevel,
                lessonType || "Document",
                ordinal,
                documentContent,
                courseID
            );
            res.status(201).json({
                success: true,
                message: "Lesson document created successfully",
                data: result
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create lesson document",
                error: error
            });
        }
    },

    updateLessonDocument: async (req: Request, res: Response) => {
        try {
            const { lessonDocumentID, documentContent } = req.body;
            const result = await LessonRepository.updateLessonDocument(lessonDocumentID, documentContent);
            res.status(200).json({
                success: true,
                message: "Lesson document updated successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update lesson document",
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

    getAllLessonsByCourseID: async (req: Request, res: Response) => {
        try {
            const { courseID } = req.body;
            const result = await LessonRepository.getAllLessons(courseID);
            res.status(200).json({
                success: true,
                message: "Lessons retrieved successfully",
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
    },
    sortLessons: async (req: Request, res: Response) => {
        try {
            const { lessonID, ordinal } = req.body;
            const result = await LessonRepository.sortLessons(lessonID, ordinal);
            res.status(200).json({
                success: true,
                message: "Lessons sorted successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to sort lessons",
                error: error
            });
        }
    }




};

export default LessonController;
