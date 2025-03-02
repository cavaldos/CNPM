import DataConnect from '../../config/DataConnect';

const ReviewRepository = {
    async createReview(comment: string, rating: number, studentID: number, courseID: number) {
        const proc = 'create_review';
        const params = {
            Comment: comment,
            Rating: rating,
            StudentID: studentID,
            CourseID: courseID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateReview(reviewID: number, comment: string, rating: number) {
        const proc = 'update_review';
        const params = {
            ReviewID: reviewID,
            Comment: comment,
            Rating: rating
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async deleteReview(reviewID: number) {
        const proc = 'delete_review';
        const params = {
            ReviewID: reviewID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getCourseReviews(courseID: number) {
        const proc = 'get_course_reviews';
        const params = {
            CourseID: courseID
        };
        return await DataConnect.executeProcedure(proc, params);
    }
};

export default ReviewRepository;
