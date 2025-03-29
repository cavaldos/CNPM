import { Router } from "express";
import CourseController from "../controller/Course.co";
import UserController from "../controller/User.co";
import ForumController from "../controller/Forum.co";
const PublicRouter = Router();

// User routes
PublicRouter.post("/user/create", UserController.createUser);
PublicRouter.post("/user/update", UserController.updateUser);
PublicRouter.post("/user/delete", UserController.deleteUser);
PublicRouter.post("/user/getAll", UserController.getAllUsers);
PublicRouter.post("/user/get", UserController.getUserByID);

// Course routes
PublicRouter.post("/course/get-all-course-pagination", CourseController.getAllCoursesPagination);
PublicRouter.post("/course/get-courses-offset", CourseController.getCoursesOffset);
PublicRouter.post("/course/autocomplete", CourseController.autoComplete);
PublicRouter.post("/course/search", CourseController.searchCourse);
PublicRouter.post("/course/get-course-detail", CourseController.getCourseDetail);

// Forum interaction
PublicRouter.post("/forum/create", ForumController.createMessage);
PublicRouter.post("/forum/delete", ForumController.deleteMessage);
PublicRouter.post("/forum/course", ForumController.getMessagesByCourse);


export default PublicRouter;
    