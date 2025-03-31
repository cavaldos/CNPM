import LearnProgressRepository from '../../../src/api/repositories/learnProgress.repo';
import DataConnect from '../../../src/config/DataConnect';

jest.mock('../../../src/config/DataConnect');

describe('LearnProgressRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Progress Management', () => {
        it('should call start_learn_progress procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LearnProgressRepository.startLearnProgress(1, 1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('start_learn_progress', {
                LessonID: 1,
                StudentID: 1
            });
        });

        it('should call update_learn_progress procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LearnProgressRepository.updateLearnProgress(1, 1, 'Completed');
            expect(mockExecuteProcedure).toHaveBeenCalledWith('update_learn_progress', {
                StudentID: 1,
                LessonID: 1,
                ProcessStatus: 'Completed'
            });
        });

        it('should call delete_learn_progress procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LearnProgressRepository.deleteLearnProgress(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('delete_learn_progress', {
                ProgressID: 1
            });
        });
    });

    describe('Progress Queries', () => {
        it('should execute correct query for getAllLessonInProgress', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await LearnProgressRepository.getAllLessonInProgress(1);
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('FROM Enrollment'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('WHERE EnrollmentID = 1'));
        });

        it('should execute correct query for getAllCourseProgress', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await LearnProgressRepository.getAllCourseProgress(1);
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('FROM Enrollment'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('WHERE StudentID = 1'));
        });

        it('should execute correct query for updateCourceProgress', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await LearnProgressRepository.updateCourceProgress(1);
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('UPDATE Enrollment'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('SET EnrollmentStatus = \'Completed\''));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('WHERE EnrollmentID = 1'));
        });

        it('should execute correct query for checkProcessStatus', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await LearnProgressRepository.checkProcessStatus(1, 1);
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('FROM LearnProgress'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('WHERE StudentID = 1'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('AND LessonID = 1'));
        });
    });
});