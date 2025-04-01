import request from 'supertest';
import app from '../../../src/app';
import DataConnect from '../../../src/config/DataConnect';

// Mock the DataConnect module
jest.mock('../../../src/config/DataConnect');

describe('CourseController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /public/course/get-all', () => {
        it('should return all courses', async () => {
            const mockCourses = [{ CourseID: 1, Title: 'Test Course' }];
            DataConnect.execute = jest.fn().mockResolvedValue(mockCourses);

            const response = await request(app)
                .get('/public/course/get-all')
                .expect(200);

            expect(response.body).toEqual({
                data: mockCourses,
                message: 'Courses retrieved successfully',
                success: true,
                total: 1
            });
        });

        it('should handle errors', async () => {
            DataConnect.execute = jest.fn().mockRejectedValue(new Error('DB error'));

            await request(app)
                .get('/public/course/get-all')
                .expect(500);
        });
    });
});