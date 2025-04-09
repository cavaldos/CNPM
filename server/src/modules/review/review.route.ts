/**
 * Review Routes
 * 
 * This file defines the routes for the Review domain.
 */

import { Router } from 'express';
import ReviewController from './review.co';

const ReviewRouter = Router();

// Review routes
ReviewRouter.post('/create', ReviewController.createReview);
ReviewRouter.post('/update', ReviewController.updateReview);
ReviewRouter.post('/delete', ReviewController.deleteReview);
ReviewRouter.post('/get-course-reviews', ReviewController.getCourseReviews);
ReviewRouter.post('/get-rating-stats', ReviewController.getCourseRatingStats);

export default ReviewRouter;
