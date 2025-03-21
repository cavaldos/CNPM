import DataConnect from '../../config/DataConnect';

const EnrollmentRepository = {
    async createEnrollment(studentID: number, courseID: number) {
        const proc = 'create_enrollment';
        const params = {
            StudentID: studentID,
            CourseID: courseID
        };

        return await DataConnect.executeProcedure(proc, params);
    },
    async deleteEnrollment(enrollmentID: number) {
        const proc = 'delete_enrollment';
        const params = {
            EnrollmentID: enrollmentID
        };

        return await DataConnect.executeProcedure(proc, params);
    },
    async updateEnrollment(enrollmentID: number, status: string) {
        const proc = 'update_enrollment_status';
        const params = {
            EnrollmentID: enrollmentID,
            Status: status
        };

        return await DataConnect.executeProcedure(proc, params);
    },
    async getAllEnrollmentsByStudent(studentID: number) {
        const query = `
                SELECT e.*, c.Title as CourseName, c.Image as CourseImage, c.Topic as CourseTopic
                FROM [Enrollment] e
                INNER JOIN [Course] c ON e.CourseID = c.CourseID
                WHERE e.StudentID = ${studentID}
                ORDER BY e.EnrollDate DESC;
        `;
        return await DataConnect.execute(query);
    },

};

export default EnrollmentRepository;
