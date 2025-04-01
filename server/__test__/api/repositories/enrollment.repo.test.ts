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
            const calledQuery = mockExecute.mock.calls[0][0];
            expect(calledQuery).toMatch(/SELECT/i);
            expect(calledQuery).toMatch(/FROM\s+\[Enrollment\]\s+e/i);
            expect(calledQuery).toMatch(/WHERE\s+e\.StudentID\s+=\s+1/i);
            expect(calledQuery).toMatch(/ORDER\s+BY\s+e\.EnrollDate\s+DESC/i);
        });

        it('should execute correct query for getContacts', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await EnrollmentRepository.getContacts(1);
            const calledQuery = mockExecute.mock.calls[0][0];
            expect(calledQuery).toMatch(/SELECT/i);
            expect(calledQuery).toMatch(/FROM\s+\[User\]\s+u/i);
            expect(calledQuery).toMatch(/WHERE\s+e\.CourseID\s+=\s+1/i);
            expect(calledQuery).toMatch(/ORDER\s+BY\s+e\.EnrollDate\s+DESC/i);
        });

        it('should execute correct query for checkEnrollment and return true when enrolled', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            mockExecute.mockResolvedValue([{ count: 1 }]);

            const result = await EnrollmentRepository.checkEnrollment(1, 1);

            const calledQuery = mockExecute.mock.calls[0][0];
            expect(calledQuery).toMatch(/SELECT\s+COUNT\(\*\)\s+as\s+count/i);
            expect(calledQuery).toMatch(/FROM\s+\[Enrollment\]/i);
            expect(calledQuery).toMatch(/WHERE\s+StudentID\s+=\s+1/i);
            expect(calledQuery).toMatch(/AND\s+CourseID\s+=\s+1/i);
            expect(calledQuery).toMatch(/AND\s+EnrollmentStatus\s+=\s+'Enrolled'/i);
            expect(result).toBe(true);
        });

        it('should return false when no enrollment exists', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            mockExecute.mockResolvedValue([{ count: 0 }]);

            const result = await EnrollmentRepository.checkEnrollment(1, 1);

            expect(result).toBe(false);
        });

        it('should return false when result is empty or invalid', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            mockExecute.mockResolvedValue([]); // Trường hợp không có kết quả

            const result = await EnrollmentRepository.checkEnrollment(1, 1);

            expect(result).toBe(false);
        });
    });
});