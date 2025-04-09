/**
 * Review Repository
 * 
 * This file defines the repository interface and implementation for the Review domain.
 */

import DataConnect from '../../config/DataConnect';
import { Review } from './review';

// Repository interface
export interface IReviewRepository {
  create(comment: string, rating: number, studentID: number, courseID: number): Promise<any>;
  update(reviewID: number, comment: string, rating: number): Promise<any>;
  delete(reviewID: number): Promise<any>;
  getCourseReviews(courseID: number): Promise<Review[]>;
  getAverageRating(courseID: number): Promise<number>;
  getRatingCount(courseID: number): Promise<number>;
}

// Repository implementation
class ReviewRepository implements IReviewRepository {
  async create(comment: string, rating: number, studentID: number, courseID: number): Promise<any> {
    const proc = 'create_review';
    const params = {
      Comment: comment,
      Rating: rating,
      StudentID: studentID,
      CourseID: courseID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async update(reviewID: number, comment: string, rating: number): Promise<any> {
    const proc = 'update_review';
    const params = {
      ReviewID: reviewID,
      Comment: comment,
      Rating: rating
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async delete(reviewID: number): Promise<any> {
    const proc = 'delete_review';
    const params = {
      ReviewID: reviewID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async getCourseReviews(courseID: number): Promise<Review[]> {
    const proc = 'get_course_reviews';
    const params = {
      CourseID: courseID
    };
    const result = await DataConnect.executeProcedure(proc, params);
    return result ? result.map((reviewData: any) => Review.create(reviewData)) : [];
  }

  async getAverageRating(courseID: number): Promise<number> {
    const query = `SELECT AVG(Rating) as averageRating FROM Review WHERE CourseID = ${courseID}`;
    const result = await DataConnect.execute(query);
    return result && result.length > 0 && result[0].averageRating ? result[0].averageRating : 0;
  }

  async getRatingCount(courseID: number): Promise<number> {
    const query = `SELECT COUNT(Rating) as ratingCount FROM Review WHERE CourseID = ${courseID}`;
    const result = await DataConnect.execute(query);
    return result && result.length > 0 && result[0].ratingCount ? result[0].ratingCount : 0;
  }
}

// Export a singleton instance
export default new ReviewRepository();
