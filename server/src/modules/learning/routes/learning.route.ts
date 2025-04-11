/**
 * Learning Routes
 *
 * This file defines the routes for the Learning domain.
 */

import { Router } from 'express';
import LearningController from '../controllers/learning.co';

const router = Router();

// Learning progress routes
router.post('/start', LearningController.startLearningProgress);
router.post('/update', LearningController.updateLearningProgress);
router.post('/delete', LearningController.deleteLearningProgress);
router.post('/get-all-lessons', LearningController.getAllLessonsInProgress);
router.post('/get-all-courses', LearningController.getAllCourseProgress);
router.post('/complete-course', LearningController.completeCourseProgress);
router.post('/check-status', LearningController.checkLearningStatus);

// Aggregate routes
router.post('/aggregate/get', LearningController.getLearningAggregate);
router.post('/aggregate/start-lesson', LearningController.startLessonWithAggregate);
router.post('/aggregate/complete-lesson', LearningController.completeLessonWithAggregate);

export default router;
