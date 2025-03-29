import { Router } from "express";
import CourseController from "../controller/Course.co";

const AdminRouters = Router();


AdminRouters.post("/course/get-all-course-pagination", CourseController.getAllCoursesPagination);


export default AdminRouters;