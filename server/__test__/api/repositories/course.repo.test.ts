import { Request, Response } from 'express';
import CourseController from '../../../src/api/controller/Course.co';
import CourseRepository from '../../../src/api/repositories/course.repo';

jest.mock('../../../src/api/repositories/course.repo'); // Mock CourseRepository

describe('CourseController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn(() => ({ json: jsonMock })) as any;
        mockResponse = {
            status: statusMock,
        };
        jest.clearAllMocks();
    });

    describe('getCourseByID', () => {
        it('should return course data when courseID is valid', async () => {
            const mockCourse = [{ id: 1, title: 'Test Course' }];
            (CourseRepository.getCourseByID as jest.Mock).mockResolvedValue(mockCourse);

            mockRequest = { body: { courseID: 1 } };

            await CourseController.getCourseByID(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'Course retrieved successfully',
                data: mockCourse,
            });
        });

        it('should return 500 if an error occurs', async () => {
            (CourseRepository.getCourseByID as jest.Mock).mockRejectedValue(new Error('Database error'));

            mockRequest = { body: { courseID: 1 } };

            await CourseController.getCourseByID(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                message: 'Failed to get course',
                error: expect.any(Error),
            });
        });
    });

    describe('searchCourse', () => {
        it('should return all courses if searchTerm is empty', async () => {
            const mockResult = { total: 1, courses: [{ id: 1, title: 'Test Course' }] };
            (CourseRepository.getAllCoursesPagination as jest.Mock).mockResolvedValue(mockResult);

            mockRequest = {
                body: {
                    searchTerm: '',
                    page: 1,
                    pageSize: 10,
                },
            };

            await CourseController.searchCourse(mockRequest as Request, mockResponse as Response);

            expect(CourseRepository.getAllCoursesPagination).toHaveBeenCalledWith(1, 10);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'All courses retrieved successfully',
                data: {
                    page: 1,
                    pageSize: 10,
                    totalPage: 1,
                    result: mockResult.courses,
                },
            });
        });

        it('should return search results if searchTerm is provided', async () => {
            const mockResult = { total: 1, courses: [{ id: 1, title: 'Search Result' }] };
            (CourseRepository.searchCourse as jest.Mock).mockResolvedValue(mockResult);

            mockRequest = {
                body: {
                    searchTerm: 'Search',
                    page: 1,
                    pageSize: 10,
                },
            };

            await CourseController.searchCourse(mockRequest as Request, mockResponse as Response);

            expect(CourseRepository.searchCourse).toHaveBeenCalledWith('Search', 1, 10);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'Search results retrieved successfully',
                data: {
                    page: 1,
                    pageSize: 10,
                    totalPage: mockResult.total,
                    result: mockResult,  // Expect toàn bộ object { total, courses }
                },
            });
        });

        it('should return 500 if an error occurs', async () => {
            (CourseRepository.searchCourse as jest.Mock).mockRejectedValue(new Error('Database error'));

            mockRequest = {
                body: {
                    searchTerm: 'Search',
                    page: 1,
                    pageSize: 10,
                },
            };

            await CourseController.searchCourse(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                message: 'Failed to search courses',
                error: 'Database error',
            });
        });
    });
});