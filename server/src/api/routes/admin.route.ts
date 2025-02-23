import { Router } from "express";
import CourseController from "../controller/Course.co";
import InvoiceController from "../controller/Invoice.co";
import UserController from "../controller/User.co";

const AdminRouter = Router();

// User management
AdminRouter.post("/user/create", UserController.createUser);
AdminRouter.post("/user/update", UserController.updateUser);
AdminRouter.post("/user/delete", UserController.deleteUser);

// Course management 
AdminRouter.post("/course/create", CourseController.createCourse);
AdminRouter.post("/course/update", CourseController.updateCourse);
AdminRouter.post("/course/delete", CourseController.deleteCourse);
AdminRouter.post("/course/getAll", CourseController.getAllCourses);

// Invoice management
AdminRouter.post("/invoice/getAll", InvoiceController.getAllInvoices);
AdminRouter.post("/invoice/unpaid", InvoiceController.getUnpaidInvoices);
AdminRouter.post("/invoice/paid", InvoiceController.getPaidInvoices);
AdminRouter.post("/invoice/delete", InvoiceController.deleteInvoice);

export default AdminRouter;