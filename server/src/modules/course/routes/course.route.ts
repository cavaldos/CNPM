/**
 * Course Routes
 * 
 * This file defines the routes for the Course domain.
 */

import { Router } from 'express';
import CourseController from '../controllers/course.co';

const router = Router();

// Course routes
router.post('/create', CourseController.createCourse);
router.post('/update', CourseController.updateCourse);
router.post('/delete', CourseController.deleteCourse);
router.post('/get', CourseController.getCourseByID);
router.post('/get-all', CourseController.getAllCourses);
router.get('/get-all', CourseController.getAllCourses);
router.post('/get-all-course-by-instructor', CourseController.getAllCoursesByInstructorID);
router.post('/get-all-course-pagination', CourseController.getAllCoursesPagination);
router.post('/search', CourseController.searchCourse);
router.post('/get-course-detail', CourseController.getCourseDetail);
router.post('/set-hidden', CourseController.setHiddenCourse);

export default router;
