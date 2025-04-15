import LessonRepository from '../../../src/api/repositories/lesson.repo';
import DataConnect from '../../../src/config/DataConnect';

jest.mock('../../../src/config/DataConnect');

describe('LessonRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Video Lessons', () => {
        it('should call create_lesson_video procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LessonRepository.createLessonVideo(
                'Test Video',
                30,
                'Beginner',
                'Video',
                1,
                1,
                'http://example.com/video.mp4'
            );
            expect(mockExecuteProcedure).toHaveBeenCalledWith('create_lesson_video', {
                Title: 'Test Video',
                Duration: 30,
                ComplexityLevel: 'Beginner',
                LessonType: 'Video',
                Ordinal: 1,
                CourseID: 1,
                URL: 'http://example.com/video.mp4'
            });
        });

        it('should call update_lesson_video procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LessonRepository.updateLessonVideo(1, 'http://example.com/updated.mp4');
            expect(mockExecuteProcedure).toHaveBeenCalledWith('update_lesson_video', {
                LessonVideoID: 1,
                URL: 'http://example.com/updated.mp4'
            });
        });
    });

    describe('Document Lessons', () => {
        it('should call create_lesson_document procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LessonRepository.createLessonDocument(
                'Test Document',
                15,
                'Intermediate',
                'Document',
                2,
                'Test content',
                1
            );
            expect(mockExecuteProcedure).toHaveBeenCalledWith('create_lesson_document', {
                Title: 'Test Document',
                Duration: 15,
                ComplexityLevel: 'Intermediate',
                LessonType: 'Document',
                Ordinal: 2,
                DocumentContent: 'Test content',
                CourseID: 1
            });
        });

        it('should call update_lesson_document procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LessonRepository.updateLessonDocument(1, 'Updated content');
            expect(mockExecuteProcedure).toHaveBeenCalledWith('update_lesson_document', {
                LessonDocumentID: 1,
                DocumentContent: 'Updated content'
            });
        });
    });

    describe('General Lesson Operations', () => {
        it('should call update_lesson procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LessonRepository.updateLesson(
                1,
                'Updated Lesson',
                45,
                'Advanced',
                'Video',
                3,
                1
            );
            expect(mockExecuteProcedure).toHaveBeenCalledWith('update_lesson', {
                LessonID: 1,
                Title: 'Updated Lesson',
                Duration: 45,
                ComplexityLevel: 'Advanced',
                LessonType: 'Video',
                Ordinal: 3,
                CourseID: 1
            });
        });

        it('should call delete_lesson procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LessonRepository.deleteLesson(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('delete_lesson', {
                LessonID: 1
            });
        });

        it('should execute correct query for getAllLessons', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await LessonRepository.getAllLessons(1);
            const calledQuery = mockExecute.mock.calls[0][0];
            expect(calledQuery).toMatch(/SELECT/);
            expect(calledQuery).toMatch(/from Lessons/); // Sửa FROM thành from
            expect(calledQuery).toMatch(/WHERE c\.CourseID = 1/);
        });

        it('should execute correct query for getLessonByID', async () => {
            const mockExecuteWithParams = jest.spyOn(DataConnect, 'executeWithParams');
            await LessonRepository.getLessonByID(1);
            expect(mockExecuteWithParams).toHaveBeenCalledWith(
                expect.stringContaining('SELECT'),
                { LessonID: 1 }
            );
        });

        it('should execute correct query for sortLessons', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await LessonRepository.sortLessons(1, 2);
            expect(mockExecute).toHaveBeenCalledWith(
                expect.stringContaining('UPDATE Lessons')
            );
        });
    });
});