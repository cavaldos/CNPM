import ReviewRepository from '../../../src/api/repositories/review.repo';
import DataConnect from '../../../src/config/DataConnect';

jest.mock('../../../src/config/DataConnect');

describe('ReviewRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Review Management', () => {
        it('should call create_review procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await ReviewRepository.createReview('Great course!', 5, 1, 1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('create_review', {
                Comment: 'Great course!',
                Rating: 5,
                StudentID: 1,
                CourseID: 1
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
    });

    describe('Review Queries', () => {
        it('should call get_course_reviews procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await ReviewRepository.getCourseReviews(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('get_course_reviews', {
                CourseID: 1
            });
        });

        it('should execute correct query for selectAVGRating', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await ReviewRepository.selectAVGRating(1);
            expect(mockExecute).toHaveBeenCalledWith(
                expect.stringContaining('SELECT AVG(Rating)')
            );
            expect(mockExecute).toHaveBeenCalledWith(
                expect.stringContaining('FROM Review')
            );
            expect(mockExecute).toHaveBeenCalledWith(
                expect.stringContaining('WHERE CourseID = 1')
            );
        });

        it('should execute correct query for selectRatingCount', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await ReviewRepository.selectRatingCount(1);
            expect(mockExecute).toHaveBeenCalledWith(
                expect.stringContaining('SELECT COUNT(Rating)')
            );
            expect(mockExecute).toHaveBeenCalledWith(
                expect.stringContaining('FROM Review')
            );
            expect(mockExecute).toHaveBeenCalledWith(
                expect.stringContaining('WHERE CourseID = 1')
            );
        });

        it('should return 0 when no ratings exist', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            mockExecute.mockResolvedValue([{ 'AVG(Rating)': null }]);

            const result = await ReviewRepository.selectAVGRating(1);
            expect(result).toBe(0);
        });

        it('should return 0 when no review count exists', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            mockExecute.mockResolvedValue([{ 'COUNT(Rating)': null }]);

            const result = await ReviewRepository.selectRatingCount(1);
            expect(result).toBe(0);
        });
    });
});