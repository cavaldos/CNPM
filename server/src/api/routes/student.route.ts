import { Router } from "express";
import CourseController from "../controller/Course.co";
import ForumController from "../controller/Forum.co";
import InvoiceController from "../controller/Invoice.co";
import LearnProgressController from "../controller/LearnProgress.co";

const StudentRouter = Router();

// Course interaction
StudentRouter.post("/course/get", CourseController.getCourseByID);
StudentRouter.post("/course/getAll", CourseController.getAllCourses);

// Course reviews
StudentRouter.post("/course/review/create", CourseController.createReview);
StudentRouter.post("/course/review/update", CourseController.updateReview);
StudentRouter.post("/course/review/delete", CourseController.deleteReview);
StudentRouter.post("/course/reviews", CourseController.getCourseReviews);

// Forum interaction
StudentRouter.post("/forum/create", ForumController.createMessage);
StudentRouter.post("/forum/update", ForumController.updateMessage);
StudentRouter.post("/forum/delete", ForumController.deleteMessage);
StudentRouter.post("/forum/course", ForumController.getMessagesByCourse);
StudentRouter.post("/forum/user", ForumController.getMessagesByUser);
StudentRouter.post("/forum/latest", ForumController.getLatestMessages);

// Learning progress
StudentRouter.post("/progress/create", LearnProgressController.createLearnProgress);
StudentRouter.post("/progress/update", LearnProgressController.updateLearnProgress);

// Invoice management
StudentRouter.post("/invoice/create", InvoiceController.createInvoice);
StudentRouter.post("/invoice/get", InvoiceController.getInvoice);
StudentRouter.post("/invoice/student", InvoiceController.getInvoicesByStudent);
StudentRouter.post("/invoice/detail/create", InvoiceController.createInvoiceDetail);
StudentRouter.post("/invoice/details", InvoiceController.getInvoiceDetails);

export default StudentRouter;