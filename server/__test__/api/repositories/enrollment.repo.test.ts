import EnrollmentRepository from '../../../src/api/repositories/enrollment.repo';
import DataConnect from '../../../src/config/DataConnect';

jest.mock('../../../src/config/DataConnect');

describe('EnrollmentRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Enrollment Management', () => {
        it('should call create_enrollment procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await EnrollmentRepository.createEnrollment(1, 1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('create_enrollment', {
                StudentID: 1,
                CourseID: 1
            });
        });

        it('should call update_enrollment_status procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await EnrollmentRepository.updateEnrollment(1, 'Completed');
            expect(mockExecuteProcedure).toHaveBeenCalledWith('update_enrollment_status', {
                EnrollmentID: 1,
                Status: 'Completed'
            });
        });

        it('should call delete_enrollment procedure', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await EnrollmentRepository.deleteEnrollment(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('delete_enrollment', {
                EnrollmentID: 1
            });
        });
    });

    describe('Enrollment Queries', () => {
        it('should execute correct query for getAllEnrollmentsByStudent', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await EnrollmentRepository.getAllEnrollmentsByStudent(1);
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('FROM Enrollment'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('WHERE StudentID = 1'));
        });

        it('should execute correct query for getContacts', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await EnrollmentRepository.getContacts(1);
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('SELECT'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('FROM User'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('WHERE CourseID = 1'));
        });

        it('should execute correct query for checkEnrollment', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            mockExecute.mockResolvedValue([{ count: 1 }]);

            const result = await EnrollmentRepository.checkEnrollment(1, 1);

            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('SELECT COUNT(*)'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('FROM Enrollment'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('WHERE StudentID = 1'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('AND CourseID = 1'));
            expect(result).toBe(true);
        });

        it('should return false when no enrollment exists', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            mockExecute.mockResolvedValue([{ count: 0 }]);

            const result = await EnrollmentRepository.checkEnrollment(1, 1);

            expect(result).toBe(false);
        });
    });
});