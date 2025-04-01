import ReviewRepository from '../../../src/api/repositories/review.repo'; // Điều chỉnh đường dẫn nếu cần
import DataConnect from '../../../src/config/DataConnect';

jest.mock('../../../src/config/DataConnect');

describe('ReviewRepository', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Xóa mock sau mỗi test để tránh ảnh hưởng
    });

    describe('Review Operations', () => {
        it('should call create_review procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await ReviewRepository.createReview('Great course!', 5, 1, 2);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('create_review', {
                Comment: 'Great course!',
                Rating: 5,
                StudentID: 1,
                CourseID: 2
            });
        });

        it('should call update_review procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await ReviewRepository.updateReview(1, 'Updated comment', 4);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('update_review', {
                ReviewID: 1,
                Comment: 'Updated comment',
                Rating: 4
            });
        });

        it('should call delete_review procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await ReviewRepository.deleteReview(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('delete_review', {
                ReviewID: 1
            });
        });

        it('should call get_course_reviews procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await ReviewRepository.getCourseReviews(2);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('get_course_reviews', {
                CourseID: 2
            });
        });

        it('should execute correct query for selectAVGRating', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await ReviewRepository.selectAVGRating(2);
            const calledQuery = mockExecute.mock.calls[0][0];
            expect(calledQuery).toMatch(/select AVG\(Rating\)/);
            expect(calledQuery).toMatch(/from Review/);
            expect(calledQuery).toMatch(/where CourseID = 2/);
        });

        it('should execute correct query for selectRatingCount', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await ReviewRepository.selectRatingCount(2);
            const calledQuery = mockExecute.mock.calls[0][0];
            expect(calledQuery).toMatch(/select COUNT\(Rating\)/);
            expect(calledQuery).toMatch(/from Review/);
            expect(calledQuery).toMatch(/where CourseID = 2/);
        });
    });
});