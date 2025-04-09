/**
 * Lesson Routes
 * 
 * This file defines the routes for the Lesson domain.
 */

import { Router } from 'express';
import LessonController from './lesson.co';

const LessonRouter = Router();

// Video lesson routes
LessonRouter.post('/video/create', LessonController.createLessonVideo);
LessonRouter.post('/video/update', LessonController.updateLessonVideo);

// Document lesson routes
LessonRouter.post('/document/create', LessonController.createLessonDocument);
LessonRouter.post('/document/update', LessonController.updateLessonDocument);

// General lesson routes
LessonRouter.post('/update', LessonController.updateLesson);
LessonRouter.post('/delete', LessonController.deleteLesson);
LessonRouter.post('/get-all', LessonController.getAllLessonsByCourseID);
LessonRouter.post('/get', LessonController.getLessonByID);
LessonRouter.post('/sort', LessonController.sortLessons);

export default LessonRouter;
