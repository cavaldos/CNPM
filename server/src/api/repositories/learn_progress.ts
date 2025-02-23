import DataConnect from '../../utils/DataConnect';

const LearnProgressRepository = {
    async createLearnProgress(studentID: number, lessonID: number, processStatus: string, startTime?: Date, completionTime?: Date) {
        const proc = 'create_learn_progress';
        const params = {
            StudentID: studentID,
            LessonID: lessonID,
            ProcessStatus: processStatus,
            StartTime: startTime,
            CompletionTime: completionTime
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateLearnProgress(progressID: number, processStatus: string, startTime?: Date, completionTime?: Date) {
        const proc = 'update_learn_progress';
        const params = {
            ProgressID: progressID,
            ProcessStatus: processStatus,
            StartTime: startTime,
            CompletionTime: completionTime
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async deleteLearnProgress(progressID: number) {
        const proc = 'delete_learn_progress';
        const params = {
            ProgressID: progressID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getAllLearnProgress() {
        const query = `
            SELECT lp.*,
                   u.FullName as StudentName,
                   l.Title as LessonName,
                   c.Title as CourseName
            FROM [LearnProgress] lp
            INNER JOIN [User] u ON lp.StudentID = u.UserID
            INNER JOIN [Lessons] l ON lp.LessonID = l.LessonID
            INNER JOIN [Course] c ON l.CourseID = c.CourseID
            ORDER BY lp.StartTime DESC
        `;
        return await DataConnect.execute(query);
    },

    async getLearnProgressByStudent(studentID: number) {
        const query = `
            SELECT lp.*,
                   l.Title as LessonName,
                   c.Title as CourseName
            FROM [LearnProgress] lp
            INNER JOIN [Lessons] l ON lp.LessonID = l.LessonID
            INNER JOIN [Course] c ON l.CourseID = c.CourseID
            WHERE lp.StudentID = @StudentID
            ORDER BY lp.StartTime DESC
        `;
        const params = { StudentID: studentID };
        return await DataConnect.executeWithParams(query, params);
    }
};

export default LearnProgressRepository;