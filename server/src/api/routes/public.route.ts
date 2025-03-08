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
PublicRouter.post("/course/autocompelete", CourseController.autoComplete);
PublicRouter.post("/course/search", CourseController.searchCourse);

// Forum interaction
PublicRouter.post("/forum/create", ForumController.createMessage);
PublicRouter.post("/forum/delete", ForumController.deleteMessage);
PublicRouter.post("/forum/course", ForumController.getMessagesByCourse);


export default PublicRouter;
