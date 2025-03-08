import { Router } from "express";
import CourseController from "../controller/Course.co";
import LessonController from "../controller/Lesson.co";

const InstructorRouter = Router();

// Course management
InstructorRouter.post("/course/create", CourseController.createCourse);
InstructorRouter.post("/course/update", CourseController.updateCourse);
InstructorRouter.post("/course/get", CourseController.getCourseByID);
InstructorRouter.post("/course/getAll", CourseController.getAllCourses);

// Lesson management
InstructorRouter.post("/lesson/video/create", LessonController.createLessonVideo);
InstructorRouter.post("/lesson/video/update", LessonController.updateLessonVideo);
InstructorRouter.post("/lesson/delete", LessonController.deleteLesson);



export default InstructorRouter;