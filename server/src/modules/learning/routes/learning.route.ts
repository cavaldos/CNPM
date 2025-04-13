/**
 * Learning Routes
 * 
 * This file defines the routes for the Learning domain.
 */

import { Router } from 'express';
import LearningController from '../controllers/learning.co';

const router = Router();

// Learning Progress routes
router.post('/progress/start', LearningController.startLearningProgress);
router.post('/progress/update', LearningController.updateLearningProgress);
router.post('/progress/check-status', LearningController.checkProcessStatus);
router.post('/progress/get-all-lesson-in-progress', LearningController.getAllLessonsInProgress);
router.post('/progress/complete', LearningController.completeCourseProgress);

// Enrollment routes
router.post('/enrollment/create', LearningController.createEnrollment);
router.post('/enrollment/update', LearningController.updateEnrollmentStatus);
router.post('/enrollment/delete', LearningController.deleteEnrollment);
router.post('/enrollment/get-all', LearningController.getAllEnrollmentsByStudent);
router.post('/enrollment/check', LearningController.checkEnrollment);

export default router;
