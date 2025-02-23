import { Router } from "express";
import CourseController from "../controller/Course.co";
const InstructorRouter = Router();

InstructorRouter.post("/create-course",CourseController.createCourse);
InstructorRouter.put("/update-course",CourseController.updateCourse);
InstructorRouter.delete("/delete-course",CourseController.deleteCourse);

export default InstructorRouter;