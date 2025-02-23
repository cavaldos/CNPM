import { Request, Response } from "express";
import CourseRepository from "../repositories/course";
import ReviewRepository from "../repositories/review";

const CourseController = {
    getCourseByID: async (req: Request, res: Response) => {
        try {
            const { courseID } = req.body;
            const result = await CourseRepository.getCourseByID(courseID);
            res.status(200).json({
                success: true,
                message: "Course retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get course",
                error: error
            });
        }
    },

    getAllCourses: async (_req: Request, res: Response) => {
        try {
            const result = await CourseRepository.getAllCourses();
            res.status(200).json({
                success: true,
                message: "Courses retrieved successfully",
                data: result[0]
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get courses",
                error: error
            });
        }
    },

    createCourse: async (req: Request, res: Response) => {
        try {
            const { title, topic, description, image, price, instructorID } = req.body;
            const result = await CourseRepository.createCourse(
                title,
                topic,
                description,
                image,
                price,
                instructorID
            );
            res.status(201).json({
                success: true,
                message: "Course created successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create course",
                error: error
            });
        }
    },

    updateCourse: async (req: Request, res: Response) => {
        try {
            const { courseID, title, topic, description, image, price, instructorID } = req.body;
            const result = await CourseRepository.updateCourse(
                courseID,
                title,
                topic,
                description,
                image,
                price,
                instructorID
            );
            res.status(200).json({
                success: true,
                message: "Course updated successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update course",
                error: error
            });
        }
    },

    deleteCourse: async (req: Request, res: Response) => {
        try {
            const { courseID } = req.body;
            const result = await CourseRepository.deleteCourse(courseID);
            res.status(200).json({
                success: true,
                message: "Course deleted successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete course",
                error: error
            });
        }
    },




    // Review management
    getCourseReviews: async (req: Request, res: Response) => {
        try {
            const { courseID } = req.body;
            const result = await ReviewRepository.getCourseReviews(courseID);
            res.status(200).json({
                success: true,
                message: "Course reviews retrieved successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get course reviews",
                error: error
            });
        }
    },

    // Review management
    createReview: async (req: Request, res: Response) => {
        try {
            const { comment, rating, studentID, courseID } = req.body;
            const result = await ReviewRepository.createReview(
                comment,
                rating,
                studentID,
                courseID
            );
            res.status(201).json({
                success: true,
                message: "Review created successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create review",
                error: error
            });
        }
    },

    updateReview: async (req: Request, res: Response) => {
        try {
            const { reviewID, comment, rating } = req.body;
            const result = await ReviewRepository.updateReview(
                reviewID,
                comment,
                rating
            );
            res.status(200).json({
                success: true,
                message: "Review updated successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update review",
                error: error
            });
        }
    },

    deleteReview: async (req: Request, res: Response) => {
        try {
            const { reviewID } = req.body;
            const result = await ReviewRepository.deleteReview(reviewID);
            res.status(200).json({
                success: true,
                message: "Review deleted successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete review",
                error: error
            });
        }
    }
};

export default CourseController;