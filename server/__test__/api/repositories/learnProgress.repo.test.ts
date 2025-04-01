import LearnProgressRepository from '../../../src/api/repositories/learnProgress.repo'; // Điều chỉnh đường dẫn nếu cần
import DataConnect from '../../../src/config/DataConnect';

jest.mock('../../../src/config/DataConnect');

describe('LearnProgressRepository', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Xóa mock sau mỗi test để tránh ảnh hưởng
    });

    describe('Learn Progress Operations', () => {
        it('should call start_learn_progress procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LearnProgressRepository.startLearnProgress(1, 2);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('start_learn_progress', {
                LessonID: 1,
                StudentID: 2
            });
        });

        it('should call update_learn_progress procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LearnProgressRepository.updateLearnProgress(2, 1, 'InProgress');
            expect(mockExecuteProcedure).toHaveBeenCalledWith('update_learn_progress', {
                StudentID: 2,
                LessonID: 1,
                ProcessStatus: 'InProgress'
            });
        });

        it('should call delete_learn_progress procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await LearnProgressRepository.deleteLearnProgress(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('delete_learn_progress', {
                ProgressID: 1
            });
        });

        it('should execute correct query for getAllLessonInProgress', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await LearnProgressRepository.getAllLessonInProgress(1);
            const calledQuery = mockExecute.mock.calls[0][0];
            expect(calledQuery).toMatch(/SELECT/i);
            expect(calledQuery).toMatch(/FROM\s+Enrollment\s+e/i); // Thêm \s+ cho khoảng trắng linh hoạt
            expect(calledQuery).toMatch(/WHERE\s+e\.EnrollmentID\s+=\s+1/i);
            expect(calledQuery).toMatch(/ORDER\s+BY\s+l\.Ordinal/i);
        });

        it('should execute correct query for getAllCourseProgress', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await LearnProgressRepository.getAllCourseProgress(2);
            const calledQuery = mockExecute.mock.calls[0][0];
            expect(calledQuery).toMatch(/SELECT/i);
            expect(calledQuery).toMatch(/FROM\s+Enrollment\s+E/i); // Thêm \s+ cho khoảng trắng
            expect(calledQuery).toMatch(/WHERE\s+StudentID\s+=\s+2/i);
        });

        it('should execute correct query for updateCourceProgress', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await LearnProgressRepository.updateCourceProgress(1);
            const calledQuery = mockExecute.mock.calls[0][0];
            expect(calledQuery).toMatch(/UPDATE\s+Enrollment/i);
            expect(calledQuery).toMatch(/SET\s+EnrollmentStatus\s+=\s+'Completed'/i);
            expect(calledQuery).toMatch(/WHERE\s+EnrollmentID\s+=\s+1/i);
        });

        it('should execute correct query for checkProcessStatus', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await LearnProgressRepository.checkProcessStatus(1, 2);
            const calledQuery = mockExecute.mock.calls[0][0];
            expect(calledQuery).toMatch(/SELECT/i);
            expect(calledQuery).toMatch(/FROM\s+\[LearnProgress\]\s+lp/i); // Thoát [] và thêm \s+
            expect(calledQuery).toMatch(/WHERE\s+lp\.StudentID\s+=\s+2/i);
            expect(calledQuery).toMatch(/AND\s+lp\.LessonID\s+=\s+1/i);
        });
    });
});