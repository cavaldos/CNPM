import DataConnect from '../../config/DataConnect';

const LearnProgressRepository = {
    async startLearnProgress(lessonID: number, studentID: number) {
        const proc = 'start_learn_progress';
        const params = {
            LessonID: lessonID,
            StudentID: studentID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateLearnProgress(progressID: number, processStatus: string) {
        const proc = 'update_learn_progress';
        const params = {
            ProgressID: progressID,
            ProcessStatus: processStatus
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

    async getAllLessonInProgress(enrollmentID: number) {
        const query = `
                SELECT
                e.EnrollmentID,
                l.LessonID,
                l.Ordinal,
                l.LessonType,
                l.Title,
                l.Duration,
                lp.ProgressID,
                COALESCE(lp.ProcessStatus, 'NotStarted') AS ProcessStatus,
                lp.StartTime,
                lp.CompletionTime
            FROM
                Enrollment e
                INNER JOIN Course c ON e.CourseID = c.CourseID
                INNER JOIN Lessons l ON c.CourseID = l.CourseID
                LEFT JOIN LearnProgress lp ON l.LessonID = lp.LessonID
                    AND lp.StudentID = e.StudentID
            WHERE
                e.EnrollmentID = ${enrollmentID}
            ORDER BY
                l.Ordinal;
        `;
        return await DataConnect.execute(query);
    },


    async getAllCourseProgress(studentID: number) {
        const query = `
                SELECT
                U.UserID AS StudentID,
                U.FullName AS StudentName,
                C.CourseID,
                C.Title AS CourseTitle,
                C.Topic,
                C.Price,
                E.EnrollDate,
                E.EnrollmentID,
                E.EnrollmentStatus
            FROM
                Enrollment E
            INNER JOIN
                [User] U ON E.StudentID = U.UserID
            INNER JOIN
                Course C ON E.CourseID = C.CourseID
            WHERE StudentID = ${studentID};
        `;
        return await DataConnect.execute(query);
    },
    async checkProcessStatus(lessonID: number, studentID: number) {
        const query = `
               SELECT
                lp.ProcessStatus,
                lp.StartTime,
                lp.CompletionTime,
                l.Title AS LessonTitle,
                u.FullName AS StudentName
            FROM
                [LearnProgress] lp
                INNER JOIN [User] u ON lp.StudentID = u.UserID
                INNER JOIN [Lessons] l ON lp.LessonID = l.LessonID
            WHERE
                lp.StudentID = ${studentID}
                AND lp.LessonID = ${lessonID}
        `;
        return await DataConnect.execute(query);
    }



};

export default LearnProgressRepository;