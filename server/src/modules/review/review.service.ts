/**
 * Review Service
 * 
 * This file defines the service layer for the Review domain, containing business logic.
 */

import { Review } from './review';
import ReviewRepository from './review.repo';

// Service interface
export interface IReviewService {
  createReview(comment: string, rating: number, studentID: number, courseID: number): Promise<any>;
  updateReview(reviewID: number, comment: string, rating: number): Promise<any>;
  deleteReview(reviewID: number): Promise<any>;
  getCourseReviews(courseID: number): Promise<Review[]>;
  getAverageRating(courseID: number): Promise<number>;
  getRatingCount(courseID: number): Promise<number>;
}

// Service implementation
class ReviewService implements IReviewService {
  async createReview(comment: string, rating: number, studentID: number, courseID: number): Promise<any> {
    // Validate input
    if (!comment || rating < 1 || rating > 5 || !studentID || !courseID) {
      throw new Error('Invalid review data. Comment is required and rating must be between 1 and 5.');
    }

    // Create review
    return await ReviewRepository.create(comment, rating, studentID, courseID);
  }

  async updateReview(reviewID: number, comment: string, rating: number): Promise<any> {
    // Validate input
    if (!reviewID || !comment || rating < 1 || rating > 5) {
      throw new Error('Invalid review data. ReviewID and comment are required, and rating must be between 1 and 5.');
    }

    // Update review
    return await ReviewRepository.update(reviewID, comment, rating);
  }

  async deleteReview(reviewID: number): Promise<any> {
    // Validate input
    if (!reviewID) {
      throw new Error('ReviewID is required');
    }

    // Delete review
    return await ReviewRepository.delete(reviewID);
  }

  async getCourseReviews(courseID: number): Promise<Review[]> {
    // Validate input
    if (!courseID) {
      throw new Error('CourseID is required');
    }

    // Get course reviews
    return await ReviewRepository.getCourseReviews(courseID);
  }

  async getAverageRating(courseID: number): Promise<number> {
    // Validate input
    if (!courseID) {
      throw new Error('CourseID is required');
    }

    // Get average rating
    return await ReviewRepository.getAverageRating(courseID);
  }

  async getRatingCount(courseID: number): Promise<number> {
    // Validate input
    if (!courseID) {
      throw new Error('CourseID is required');
    }

    // Get rating count
    return await ReviewRepository.getRatingCount(courseID);
  }
}

// Export a singleton instance
export default new ReviewService();
