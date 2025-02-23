import { Router } from "express";
import CourseController from "../controller/Course.co";
import InvoiceController from "../controller/Invoice.co";
import UserController from "../controller/User.co";
import LessonController from "../controller/Lesson.co";
import LearnProgressController from "../controller/LearnProgress.co";
import ForumController from "../controller/Forum.co";

const AdminRouter = Router();

// User management
AdminRouter.post("/user/create", UserController.createUser);
AdminRouter.post("/user/update", UserController.updateUser);
AdminRouter.post("/user/delete", UserController.deleteUser);
AdminRouter.post("/user/getAll", UserController.getAllUsers);
AdminRouter.post("/user/get", UserController.getUserByID);

// Course management 
AdminRouter.post("/course/create", CourseController.createCourse);
AdminRouter.post("/course/update", CourseController.updateCourse);
AdminRouter.post("/course/delete", CourseController.deleteCourse);
AdminRouter.post("/course/getAll", CourseController.getAllCourses);

// Lesson management
AdminRouter.post("/lesson/getAll", LessonController.getAllLessons);
AdminRouter.post("/lesson/get", LessonController.getLessonByID);

// Forum management
AdminRouter.post("/forum/getAll", ForumController.getAllMessages);

// Learn Progress management
AdminRouter.post("/progress/getAll", LearnProgressController.getAllLearnProgress);
AdminRouter.post("/progress/student", LearnProgressController.getLearnProgressByStudent);

// Invoice management
AdminRouter.post("/invoice/getAll", InvoiceController.getAllInvoices);
AdminRouter.post("/invoice/unpaid", InvoiceController.getUnpaidInvoices);
AdminRouter.post("/invoice/paid", InvoiceController.getPaidInvoices);
AdminRouter.post("/invoice/delete", InvoiceController.deleteInvoice);

export default AdminRouter;