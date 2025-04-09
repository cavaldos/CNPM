/**
 * Review Routes
 * 
 * This file defines the routes for the Review domain.
 */

import { Router } from 'express';
import ReviewController from '../controllers/review.co';

const router = Router();

// Review routes
router.post('/create', ReviewController.createReview);
router.post('/update', ReviewController.updateReview);
router.post('/delete', ReviewController.deleteReview);
router.post('/get-course-reviews', ReviewController.getCourseReviews);
router.post('/get-rating-stats', ReviewController.getCourseRatingStats);

export default router;
