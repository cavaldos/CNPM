import { Router } from "express";
import CourseController from "../controller/Course.co";
import ForumController from "../controller/Forum.co";
import InvoiceController from "../controller/Invoice.co";
import LearnProgressController from "../controller/LearnProgress.co";
import UserController from "../controller/User.co";
import LessonController from "../controller/Lesson.co";
import NotifyController from "../controller/Notify.co";

const PublicRouter = Router();

// User routes
PublicRouter.post("/user/create", UserController.createUser);
PublicRouter.post("/user/update", UserController.updateUser);
PublicRouter.post("/user/delete", UserController.deleteUser);
PublicRouter.post("/user/getAll", UserController.getAllUsers);
PublicRouter.post("/user/get", UserController.getUserByID);

// Course routes
PublicRouter.post("/course/create", CourseController.createCourse);
PublicRouter.post("/course/update", CourseController.updateCourse);
PublicRouter.post("/course/delete", CourseController.deleteCourse);
PublicRouter.post("/course/get", CourseController.getCourseByID);
PublicRouter.post("/course/getAll", CourseController.getAllCourses);

// Course Review routes
PublicRouter.post("/course/review/create", CourseController.createReview);
PublicRouter.post("/course/review/update", CourseController.updateReview);
PublicRouter.post("/course/review/delete", CourseController.deleteReview);
PublicRouter.post("/course/reviews", CourseController.getCourseReviews);

// Lesson routes
PublicRouter.post("/lesson/video/create", LessonController.createLessonVideo);
PublicRouter.post("/lesson/video/update", LessonController.updateLessonVideo);
PublicRouter.post("/lesson/delete", LessonController.deleteLesson);
PublicRouter.post("/lesson/getAll", LessonController.getAllLessons);
PublicRouter.post("/lesson/get", LessonController.getLessonByID);

// Forum routes
PublicRouter.post("/forum/create", ForumController.createMessage);
PublicRouter.post("/forum/update", ForumController.updateMessage);
PublicRouter.post("/forum/delete", ForumController.deleteMessage);
PublicRouter.post("/forum/course", ForumController.getMessagesByCourse);
PublicRouter.post("/forum/user", ForumController.getMessagesByUser);
PublicRouter.post("/forum/latest", ForumController.getLatestMessages);
PublicRouter.post("/forum/count", ForumController.getMessageCount);
PublicRouter.post("/forum/getAll", ForumController.getAllMessages);

// Invoice routes
PublicRouter.post("/invoice/create", InvoiceController.createInvoice);
PublicRouter.post("/invoice/update", InvoiceController.updateInvoice);
PublicRouter.post("/invoice/delete", InvoiceController.deleteInvoice);
PublicRouter.post("/invoice/get", InvoiceController.getInvoice);
PublicRouter.post("/invoice/getAll", InvoiceController.getAllInvoices);
PublicRouter.post("/invoice/student", InvoiceController.getInvoicesByStudent);
PublicRouter.post("/invoice/unpaid", InvoiceController.getUnpaidInvoices);
PublicRouter.post("/invoice/paid", InvoiceController.getPaidInvoices);

// Invoice Detail routes
PublicRouter.post("/invoice/detail/create", InvoiceController.createInvoiceDetail);
PublicRouter.post("/invoice/detail/update", InvoiceController.updateInvoiceDetail);
PublicRouter.post("/invoice/detail/delete", InvoiceController.deleteInvoiceDetail);
PublicRouter.post("/invoice/details", InvoiceController.getInvoiceDetails);

// Learn Progress routes
PublicRouter.post("/progress/create", LearnProgressController.createLearnProgress);
PublicRouter.post("/progress/update", LearnProgressController.updateLearnProgress);
PublicRouter.post("/progress/delete", LearnProgressController.deleteLearnProgress);
PublicRouter.post("/progress/getAll", LearnProgressController.getAllLearnProgress);
PublicRouter.post("/progress/student", LearnProgressController.getLearnProgressByStudent);

// Notify routes
PublicRouter.post("/notify/create", NotifyController.createNotify);
PublicRouter.post("/notify/update", NotifyController.updateNotify);
PublicRouter.post("/notify/delete", NotifyController.deleteNotify);
PublicRouter.post("/notify/getAll", NotifyController.getAllNotifications);
PublicRouter.post("/notify/user", NotifyController.getNotificationsByUser);

export default PublicRouter;
