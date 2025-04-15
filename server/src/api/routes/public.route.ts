import { Router } from "express";
import CourseController from "../controller/Course.co";
import UserController from "../controller/User.co";
import ForumController from "../controller/Forum.co";
import { cacheMiddleware } from "../../middleware/cache.middleware";
const PublicRouter = Router();

// User routes
PublicRouter.post("/user/create", UserController.createUser);
PublicRouter.post("/user/update", UserController.updateUser);
PublicRouter.post("/user/delete", UserController.deleteUser);
PublicRouter.post("/user/get-all", UserController.getAllUsers);
PublicRouter.post("/user/get", UserController.getUserByID);

// Course routes
PublicRouter.post("/course/get-all-course-pagination", cacheMiddleware(300), CourseController.getAllCoursesPagination);
PublicRouter.post("/course/autocomplete", cacheMiddleware(300), CourseController.autoComplete);
PublicRouter.post("/course/search", cacheMiddleware(300), CourseController.searchCourse);
PublicRouter.post("/course/get-course-detail", CourseController.getCourseDetail);
PublicRouter.post("/course/get-all", CourseController.getAllCourses);
PublicRouter.get("/course/get-all", CourseController.getAllCourses);

// Forum interaction
PublicRouter.post("/forum/create", ForumController.createMessage);
PublicRouter.post("/forum/delete", ForumController.deleteMessage);
PublicRouter.post("/forum/course", ForumController.getMessagesByCourse);


export default PublicRouter;