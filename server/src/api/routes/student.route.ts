import { Router } from "express";
import CourseController from "../controller/Course.co";
const StudentRouter = Router();

StudentRouter.post("/get-all-course", CourseController.getAllCourses);
StudentRouter.put("/update-course", CourseController.updateCourse);
StudentRouter.delete("/delete-course", CourseController.deleteCourse);

export default StudentRouter;