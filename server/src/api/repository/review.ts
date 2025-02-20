import DataConnect from "../../utils/DataConnect";

const ReviewRepository = {
  async getReviews() {
    try {
      const query = "SELECT * FROM [Review]";
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting reviews: ${error.message}`);
      }
      throw new Error('Error getting reviews');
    }
  },

  async getReviewById(id: number) {
    try {
      const query = `SELECT * FROM [Review] WHERE ReviewID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting review by id: ${error.message}`);
      }
      throw new Error('Error getting review by id');
    }
  },

  async createReview(review: {
    comment: string;
    rating: number;
    studentId: number;
    courseId: number;
  }) {
    try {
      const query = `
        INSERT INTO [Review] (Comment, Rating, CreatedDate, StudentID, CourseID)
        VALUES (
          '${review.comment}',
          ${review.rating},
          GETDATE(),
          ${review.studentId},
          ${review.courseId}
        )`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating review: ${error.message}`);
      }
      throw new Error('Error creating review');
    }
  },

  async updateReview(id: number, review: {
    comment?: string;
    rating?: number;
  }) {
    try {
      let updateFields = [];
      if (review.comment) updateFields.push(`Comment = '${review.comment}'`);
      if (review.rating) updateFields.push(`Rating = ${review.rating}`);

      const query = `
        UPDATE [Review] 
        SET ${updateFields.join(', ')}
        WHERE ReviewID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating review: ${error.message}`);
      }
      throw new Error('Error updating review');
    }
  },

  async deleteReview(id: number) {
    try {
      const query = `DELETE FROM [Review] WHERE ReviewID = ${id}`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting review: ${error.message}`);
      }
      throw new Error('Error deleting review');
    }
  },

  async getReviewsByCourse(courseId: number) {
    try {
      const query = `
        SELECT r.*, u.FullName as StudentName
        FROM [Review] r
        JOIN [User] u ON r.StudentID = u.UserID
        WHERE r.CourseID = ${courseId}
        ORDER BY r.CreatedDate DESC`;
      const result = await DataConnect.execute(query);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting reviews by course: ${error.message}`);
      }
      throw new Error('Error getting reviews by course');
    }
  }
};

export default ReviewRepository;