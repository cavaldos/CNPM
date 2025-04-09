/**
 * Lesson Routes
 * 
 * This file defines the routes for the Lesson domain.
 */

import { Router } from 'express';
import LessonController from '../controllers/lesson.co';

const router = Router();

// Video lesson routes
router.post('/video/create', LessonController.createLessonVideo);
router.post('/video/update', LessonController.updateLessonVideo);

// Document lesson routes
router.post('/document/create', LessonController.createLessonDocument);
router.post('/document/update', LessonController.updateLessonDocument);

// General lesson routes
router.post('/update', LessonController.updateLesson);
router.post('/delete', LessonController.deleteLesson);
router.post('/get-all', LessonController.getAllLessonsByCourseID);
router.post('/get', LessonController.getLessonByID);
router.post('/sort', LessonController.sortLessons);

export default router;
