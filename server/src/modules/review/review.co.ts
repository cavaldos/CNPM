/**
 * Review Controller
 * 
 * This file defines the controller layer for the Review domain, handling HTTP requests.
 */

import { Request, Response } from 'express';
import ReviewService from './review.service';

const ReviewController = {
  async createReview(req: Request, res: Response): Promise<void> {
    try {
      const { comment, rating, studentID, courseID } = req.body;
      
      const result = await ReviewService.createReview(comment, rating, studentID, courseID);
      
      res.status(201).json({
        success: true,
        message: 'Review created successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create review',
        error: error
      });
    }
  },

  async updateReview(req: Request, res: Response): Promise<void> {
    try {
      const { reviewID, comment, rating } = req.body;
      
      const result = await ReviewService.updateReview(reviewID, comment, rating);
      
      res.status(200).json({
        success: true,
        message: 'Review updated successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update review',
        error: error
      });
    }
  },

  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const { reviewID } = req.body;
      
      const result = await ReviewService.deleteReview(reviewID);
      
      res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete review',
        error: error
      });
    }
  },

  async getCourseReviews(req: Request, res: Response): Promise<void> {
    try {
      const { courseID } = req.body;
      
      const reviews = await ReviewService.getCourseReviews(courseID);
      
      res.status(200).json({
        success: true,
        message: 'Reviews retrieved successfully',
        data: reviews.map(review => review.toDTO())
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get reviews',
        error: error
      });
    }
  },

  async getCourseRatingStats(req: Request, res: Response): Promise<void> {
    try {
      const { courseID } = req.body;
      
      const averageRating = await ReviewService.getAverageRating(courseID);
      const ratingCount = await ReviewService.getRatingCount(courseID);
      
      res.status(200).json({
        success: true,
        message: 'Rating statistics retrieved successfully',
        data: {
          averageRating,
          ratingCount
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get rating statistics',
        error: error
      });
    }
  }
};

export default ReviewController;
