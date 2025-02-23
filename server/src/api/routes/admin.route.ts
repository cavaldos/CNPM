import { Router } from "express";
import CourseController from "../controller/Course.co";
const AdminRouter = Router();

AdminRouter.post("/create-course", CourseController.createCourse);
AdminRouter.put("/update-course", CourseController.updateCourse);
AdminRouter.delete("/delete-course", CourseController.deleteCourse);

export default AdminRouter;