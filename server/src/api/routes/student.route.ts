import { Router } from "express";
import CourseController from "../controller/Course.co";
import LearnProgressController from "../controller/LearnProgress.co";
import EnrollmentController from "../controller/Enrollment.co";
import LessonController from "../controller/Lesson.co";
const StudentRouter = Router();

StudentRouter.post("/course/get-all-course", CourseController.getAllCourses);
StudentRouter.post("/course/check-course-enrolled", CourseController.checkCourseEnrollment);
// Course reviews
StudentRouter.post("/course/review/create", CourseController.review.createReview);
StudentRouter.post("/course/review/update", CourseController.review.updateReview);
StudentRouter.post("/course/review/delete", CourseController.review.deleteReview);
StudentRouter.post("/course/reviews", CourseController.review.getCourseReviews);

// Learning progress

StudentRouter.post("/progress/get-all", LearnProgressController.getAllCourseProgress);
StudentRouter.post("/progress/check-status", LearnProgressController.checkProcessStatus);
StudentRouter.post("/progress/complete", LearnProgressController.completeCourseProgress);

StudentRouter.post("/progress/start", LearnProgressController.startLearnProgress);
StudentRouter.post("/progress/update", LearnProgressController.updateLearnProgress);
StudentRouter.post("/progress/delete", LearnProgressController.deleteLearnProgress);
StudentRouter.post("/progress/get-all-progress-enrolled", LearnProgressController.getAllCourseProgressEnrolled);
StudentRouter.post("/progress/get-all-lesson-in-progress", LearnProgressController.getAllLessonInProgress);

//lesson
StudentRouter.post("/lesson/get-lesson-by-id", LessonController.getLessonByID);
StudentRouter.post("/lesson/get-all-lessons", LessonController.getAllLessonsByCourseID);
// Enrollment management

StudentRouter.post("/enrollment/create", EnrollmentController.createEnrollment);
StudentRouter.post("/enrollment/delete", EnrollmentController.deleteEnrollment);
StudentRouter.post("/enrollment/update-status", EnrollmentController.updateEnrollmentStatus);
StudentRouter.post("/enrollment/get-by-student-id", EnrollmentController.getAllEnrollmentsByStudent);
StudentRouter.post("/enrollment/get-contacts", EnrollmentController.getContacts);



export default StudentRouter;
