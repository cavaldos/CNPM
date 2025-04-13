/**
 * LearnProgress Routes
 * 
 * This file defines the routes for the LearnProgress domain.
 */

import { Router } from 'express';
import LearnProgressController from '../controllers/learnProgress.co';

const router = Router();

// LearnProgress routes
router.post('/start', LearnProgressController.startLearnProgress);
router.post('/update', LearnProgressController.updateLearnProgress);
router.post('/delete', LearnProgressController.deleteLearnProgress);
router.post('/get-all-lesson-in-progress', LearnProgressController.getAllLessonInProgress);
router.post('/get-all-course-progress', LearnProgressController.getAllCourseProgress);
router.post('/complete', LearnProgressController.completeCourseProgress);
router.post('/check-status', LearnProgressController.checkProcessStatus);

export default router;
