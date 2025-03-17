import { Router } from "express";
import CourseController from "../controller/Course.co";
import LessonController from "../controller/Lesson.co";

const InstructorRouter = Router();

// Course management
InstructorRouter.post("/course/create", CourseController.createCourse);
InstructorRouter.post("/course/update", CourseController.updateCourse);
InstructorRouter.post("/course/get", CourseController.getCourseByID);
InstructorRouter.post("/course/get-all-course-by-instructor", CourseController.getAllCoursesByInstructorID);
InstructorRouter.post("/course/set-hidden", CourseController.setHiddenCourse);
InstructorRouter.post("/course/getAll", CourseController.getAllCourses);

// Lesson management
InstructorRouter.post("/lesson/video/create", LessonController.createLessonVideo);
InstructorRouter.post("/lesson/video/update", LessonController.updateLessonVideo);
InstructorRouter.post("/lesson/document/create", LessonController.createLessonDocument);
InstructorRouter.post("/lesson/document/update", LessonController.updateLessonDocument);
InstructorRouter.post("/lesson/delete", LessonController.deleteLesson);
InstructorRouter.post("/lesson/get-all-lesson-course-id", LessonController.getLessonByID);
InstructorRouter.post("/lesson/get-lesson-by-id", LessonController.getLessonByID);
InstructorRouter.post("/lesson/sort", LessonController.sortLessons);
InstructorRouter.post("/lesson/get-lesson-by-id", LessonController.getLessonByID);
InstructorRouter.post("/lesson/sort", LessonController.sortLessons);

export default InstructorRouter;