import { Request, Response } from "express";
import CourseRepository from "../repositories/course.repo";
import ReviewRepository from "../repositories/review.repo";
import LessonRepository from "../repositories/lesson.repo";
import EnrollmentRepository from "../repositories/enrollment.repo";
import { datasearch } from "../../utils/fakedata/course";
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

            // Note: The caching is now handled by the middleware
            // This is just the original controller logic
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
            console.log(req.body);
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
            let formattedResult: string[] = [];
            const limitedRecent = datasearch.recent.slice(0, 5); // Limit recent searches

            if (searchTerm && searchTerm.trim() !== "") {
                const result = await CourseRepository.autoComplete(searchTerm);
                // Limit results to 5 and format
                const limitedResult = result.slice(0, 5);
                formattedResult = limitedResult.map((item: any) => item.Word);
            }

            res.status(200).json({
                success: true,
                message: "Auto-complete results retrieved successfully",
                data: {
                    results: formattedResult, // Use the potentially empty or limited array
                    recent: limitedRecent,
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to get auto-complete results",
                error: error,
            });
        }
    },
    searchCourse: async (req: Request, res: Response) => {
        try {
            const searchTerm = req.body.searchTerm || '';
            const page = parseInt(req.body.page as string) || 1;
            const pageSize = parseInt(req.body.pageSize as string) || 10;

            console.log(`Searching for: "${searchTerm}", page: ${page}, pageSize: ${pageSize}`);

            if (!searchTerm || searchTerm.trim() === "") {
                const result = await CourseRepository.getAllCoursesPagination(page, pageSize);
                return res.status(200).json({
                    success: true,
                    message: "All courses retrieved successfully",
                    data: {
                        page: page,
                        pageSize: pageSize,
                        totalPage: result.total || 0,
                        result: result.courses || [],
                    }
                });
            }

            const result = await CourseRepository.searchCourse(
                searchTerm,
                page,
                pageSize
            );

            return res.status(200).json({
                success: true,
                message: "Search results retrieved successfully",
                data: {
                    page: page,
                    pageSize: pageSize,
                    totalPage: result.total || 0,
                    result: result.result || [],
                }
            });
        } catch (error) {
            console.error("Search course error:", error);
            return res.status(500).json({
                success: false,
                message: "Failed to search courses",
                error: error instanceof Error ? error.message : String(error)
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
    checkCourseEnrollment: async (req: Request, res: Response) => {
        try {
            const { studentID, courseID } = req.body;
            // Validate input
            if (!studentID || !courseID) {
                return res.status(400).json({
                    success: false,
                    message: "Missing studentID or courseID in request body"
                });
            }
            const isEnrolled = await EnrollmentRepository.checkEnrollment(studentID, courseID);
            return res.status(200).json({
                success: true,
                message: "Enrollment status retrieved successfully",
                data: { isEnrolled: isEnrolled }
            });
        } catch (error) {
            console.error("Error checking enrollment status:", error); // Log the error for debugging
            return res.status(500).json({
                success: false,
                message: "Failed to check enrollment status",
                error: error instanceof Error ? error.message : String(error) // Provide error details
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
        },


    }
};

export default CourseController;