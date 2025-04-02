import { Request, Response } from 'express';
import ForumController from '../../../src/api/controller/Forum.co'; // Điều chỉnh đường dẫn nếu cần
import ForumRepository from '../../../src/api/repositories/forum.repo';

jest.mock('../../../src/api/repositories/forum.repo'); // Mock ForumRepository

describe('ForumController', () => {
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

    describe('createMessage', () => {
        it('should create a forum message successfully', async () => {
            const mockResult = { id: 1, content: 'Test message' };
            (ForumRepository.createForumMessage as jest.Mock).mockResolvedValue(mockResult);

            mockRequest = {
                body: {
                    content: 'Test message',
                    courseID: 1,
                    userID: 1,
                },
            };

            await ForumController.createMessage(mockRequest as Request, mockResponse as Response);

            expect(ForumRepository.createForumMessage).toHaveBeenCalledWith('Test message', 1, 1);
            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'Forum message created successfully',
                data: mockResult,
            });
        });

        it('should return 500 if an error occurs', async () => {
            (ForumRepository.createForumMessage as jest.Mock).mockRejectedValue(new Error('Database error'));

            mockRequest = {
                body: {
                    content: 'Test message',
                    courseID: 1,
                    userID: 1,
                },
            };

            await ForumController.createMessage(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                message: 'Failed to create forum message',
                error: expect.any(Error),
            });
        });
    });

    describe('updateMessage', () => {
        it('should update a forum message successfully', async () => {
            const mockResult = { id: 1, content: 'Updated message' };
            (ForumRepository.updateForumMessage as jest.Mock).mockResolvedValue(mockResult);

            mockRequest = {
                body: {
                    forumMessageID: 1,
                    content: 'Updated message',
                },
            };

            await ForumController.updateMessage(mockRequest as Request, mockResponse as Response);

            expect(ForumRepository.updateForumMessage).toHaveBeenCalledWith(1, 'Updated message');
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'Forum message updated successfully',
                data: mockResult,
            });
        });

        it('should return 500 if an error occurs', async () => {
            (ForumRepository.updateForumMessage as jest.Mock).mockRejectedValue(new Error('Database error'));

            mockRequest = {
                body: {
                    forumMessageID: 1,
                    content: 'Updated message',
                },
            };

            await ForumController.updateMessage(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                message: 'Failed to update forum message',
                error: expect.any(Error),
            });
        });
    });

    describe('deleteMessage', () => {
        it('should delete a forum message successfully', async () => {
            const mockResult = { id: 1 };
            (ForumRepository.deleteForumMessage as jest.Mock).mockResolvedValue(mockResult);

            mockRequest = {
                body: {
                    forumMessageID: 1,
                },
            };

            await ForumController.deleteMessage(mockRequest as Request, mockResponse as Response);

            expect(ForumRepository.deleteForumMessage).toHaveBeenCalledWith(1);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'Forum message deleted successfully',
                data: mockResult,
            });
        });

        it('should return 500 if an error occurs', async () => {
            (ForumRepository.deleteForumMessage as jest.Mock).mockRejectedValue(new Error('Database error'));

            mockRequest = {
                body: {
                    forumMessageID: 1,
                },
            };

            await ForumController.deleteMessage(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                message: 'Failed to delete forum message',
                error: expect.any(Error),
            });
        });
    });

    describe('getMessagesByCourse', () => {
        it('should retrieve forum messages by course successfully', async () => {
            const mockResult = [{ id: 1, content: 'Test message' }];
            (ForumRepository.getForumMessagesByCourse as jest.Mock).mockResolvedValue(mockResult);

            mockRequest = {
                body: {
                    courseID: 1,
                },
            };

            await ForumController.getMessagesByCourse(mockRequest as Request, mockResponse as Response);

            expect(ForumRepository.getForumMessagesByCourse).toHaveBeenCalledWith(1);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'Course forum messages retrieved successfully',
                data: mockResult,
            });
        });

        it('should return 500 if an error occurs', async () => {
            (ForumRepository.getForumMessagesByCourse as jest.Mock).mockRejectedValue(new Error('Database error'));

            mockRequest = {
                body: {
                    courseID: 1,
                },
            };

            await ForumController.getMessagesByCourse(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                message: 'Failed to get course forum messages',
                error: expect.any(Error),
            });
        });
    });

    describe('getMessagesByUser', () => {
        it('should retrieve forum messages by user successfully', async () => {
            const mockResult = [{ id: 1, content: 'Test message' }];
            (ForumRepository.getForumMessagesByUser as jest.Mock).mockResolvedValue(mockResult);

            mockRequest = {
                body: {
                    userID: 1,
                },
            };

            await ForumController.getMessagesByUser(mockRequest as Request, mockResponse as Response);

            expect(ForumRepository.getForumMessagesByUser).toHaveBeenCalledWith(1);
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'User forum messages retrieved successfully',
                data: mockResult,
            });
        });

        it('should return 500 if an error occurs', async () => {
            (ForumRepository.getForumMessagesByUser as jest.Mock).mockRejectedValue(new Error('Database error'));

            mockRequest = {
                body: {
                    userID: 1,
                },
            };

            await ForumController.getMessagesByUser(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                message: 'Failed to get user forum messages',
                error: expect.any(Error),
            });
        });
    });

    describe('getAllMessages', () => {
        it('should retrieve all forum messages successfully', async () => {
            const mockResult = [{ id: 1, content: 'Test message' }];
            (ForumRepository.getAllMessages as jest.Mock).mockResolvedValue(mockResult);

            mockRequest = {};

            await ForumController.getAllMessages(mockRequest as Request, mockResponse as Response);

            expect(ForumRepository.getAllMessages).toHaveBeenCalled();
            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                success: true,
                message: 'All forum messages retrieved successfully',
                data: mockResult,
            });
        });

        it('should return 500 if an error occurs', async () => {
            (ForumRepository.getAllMessages as jest.Mock).mockRejectedValue(new Error('Database error'));

            mockRequest = {};

            await ForumController.getAllMessages(mockRequest as Request, mockResponse as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                success: false,
                message: 'Failed to get all forum messages',
                error: expect.any(Error),
            });
        });
    });
});