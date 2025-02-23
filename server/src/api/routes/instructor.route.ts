import { Router } from "express";
import CourseController from "../controller/Course.co";
import LessonController from "../controller/Lesson.co";
import ForumController from "../controller/Forum.co";

const InstructorRouter = Router();

// Course management
InstructorRouter.post("/course/create", CourseController.createCourse);
InstructorRouter.post("/course/update", CourseController.updateCourse);
InstructorRouter.post("/course/get", CourseController.getCourseByID);
InstructorRouter.post("/course/getAll", CourseController.getAllCourses);
InstructorRouter.post("/course/reviews", CourseController.getCourseReviews);

// Lesson management
InstructorRouter.post("/lesson/video/create", LessonController.createLessonVideo);
InstructorRouter.post("/lesson/video/update", LessonController.updateLessonVideo);
InstructorRouter.post("/lesson/delete", LessonController.deleteLesson);

// Forum interaction
InstructorRouter.post("/forum/create", ForumController.createMessage);
InstructorRouter.post("/forum/update", ForumController.updateMessage);
InstructorRouter.post("/forum/delete", ForumController.deleteMessage);
InstructorRouter.post("/forum/course", ForumController.getMessagesByCourse);
InstructorRouter.post("/forum/latest", ForumController.getLatestMessages);
InstructorRouter.post("/forum/count", ForumController.getMessageCount);

export default InstructorRouter;