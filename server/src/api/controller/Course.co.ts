import { Request, Response } from "express";
import CourseRepository from "../repositories/course";
import ReviewRepository from "../repositories/review";
import LessonRepository from "../repositories/lesson";
import { datasearch } from "../../fakedata/course";
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
                total: result.length,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get courses",
                error: error
            });
        }
    },
    getAllCoursesPagination: async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.body.page as string) || 1;
            const pageSize = parseInt(req.body.pageSize as string) || 10;
            // const offset = (page - 1) * pageSize;

            const result = await CourseRepository.getAllCoursesPagination(
                page,
                pageSize
            );
            res.status(200).json({
                success: true,
                message: "Courses retrieved successfully",
                data: {
                    page: page,
                    pageSize: pageSize,
                    totalPage: result.total,
                    result: result.courses,
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get courses",
                error: error
            });
        }
    },

    getCoursesOffset: async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.body.page as string) || 0;
            const pageSize = parseInt(req.body.pageSize as string) || 10;
            // const offset = (page - 1) * pageSize;

            const result = await CourseRepository.getAllCoursesPagination(
                page,
                pageSize
            );
            res.status(200).json({
                success: true,
                message: "Courses retrieved successfully",
                data: {
                    page: page,
                    pageSize: pageSize,
                    totalPage: result.total,
                    result: result.courses,
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get courses",
                error: error
            });
        }
    },

    getAllCoursesByInstructorID: async (req: Request, res: Response) => {
        try {
            const { instructorID } = req.body;
            const result = await CourseRepository.getAllCoursesByInstructorID(instructorID);
            res.status(200).json({
                success: true,
                message: "Courses retrieved successfully",
                data: result
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
            const { title, topic, description, image, instructorID } = req.body;
            const result = await CourseRepository.createCourse(
                title,
                topic,
                description,
                image,
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
            const { courseID, title, topic, description, image, instructorID } = req.body;
            const result = await CourseRepository.updateCourse(
                courseID,
                title,
                topic,
                description,
                image,
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
    autoComplete: async (req: Request, res: Response) => {
        try {
            const { searchTerm } = req.body;
            console.log("searchTerm", searchTerm);
            res.status(200).json({
                success: true,
                message: "Auto-complete results retrieved successfully",
                data: datasearch,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get auto-complete results",
                error: error
            });
        }
    },
    searchCourse: async (req: Request, res: Response) => {
        try {
            const { searchTerm } = req.body;
            console.log("searchTerm", searchTerm);
            const page = 1;
            const pageSize = 10;
            const result = await CourseRepository.getAllCoursesPagination(
                page,
                pageSize
            );
            res.status(200).json({
                success: true,
                message: "Search results retrieved successfully",
                data: {
                    page: page,
                    pageSize: pageSize,
                    totalPage: result.total,
                    result: result.courses,
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to search courses",
                error: error
            });
        }
    },
    setHiddenCourse: async (req: Request, res: Response) => {
        try {
            const { courseID, isHidden } = req.body;

            // Validate isHidden value
            if (isHidden !== 0 && isHidden !== 1 && isHidden !== true && isHidden !== false) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid value for isHidden. Must be 0 or 1"
                });
            }

            const result = await CourseRepository.setHiddenCourse(courseID, isHidden);
            return res.status(200).json({
                success: true,
                message: "Course visibility updated successfully",
                data: result
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to update course visibility",
                error: error
            });
        }
    },
    getCourseDetail: async (req: Request, res: Response) => {
        try {
            const { courseID } = req.body;
            const CourseInfo = await CourseRepository.getCourseByID(courseID);
            const lesson = await LessonRepository.getAllLessons(courseID);
            res.status(200).json({
                success: true,
                message: "Course detail retrieved successfully",
                data: {
                    CourseInfo: CourseInfo[0],
                    lessons: lesson
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get course detail",
                error: error
            });
        }
    },


    review: {

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
    }
};

export default CourseController;