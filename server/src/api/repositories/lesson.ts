import DataConnect from '../../config/DataConnect';

const LessonRepository = {
    // Video lesson methods
    async createLessonVideo(title: string, duration: number, complexityLevel: string, lessonType: string,
        ordinal: number, courseID: number, url: string) {
        const proc = 'create_lesson_video';
        const params = {
            Title: title,
            Duration: duration,
            ComplexityLevel: complexityLevel,
            LessonType: lessonType,
            Ordinal: ordinal,
            CourseID: courseID,
            URL: url
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateLessonVideo(lessonVideoID: number, url: string) {
        const proc = 'update_lesson_video';
        const params = {
            LessonVideoID: lessonVideoID,
            URL: url
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    // Document lesson methods
    async createLessonDocument(title: string, duration: number, complexityLevel: string, lessonType: string,
        ordinal: number, documentContent: string, courseID: number) {
        const proc = 'create_lesson_document';
        const params = {
            Title: title,
            Duration: duration,
            ComplexityLevel: complexityLevel,
            LessonType: lessonType,
            Ordinal: ordinal,
            DocumentContent: documentContent,
            CourseID: courseID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateLessonDocument(lessonDocumentID: number, documentContent: string) {
        const proc = 'update_lesson_document';
        const params = {
            LessonDocumentID: lessonDocumentID,
            DocumentContent: documentContent
        };
        return await DataConnect.executeProcedure(proc, params);
    },


    // General lesson methods
    async updateLesson(lessonID: number, title: string, duration: number, complexityLevel: string,
        lessonType: string, ordinal: number, courseID: number) {
        const proc = 'update_lesson';
        const params = {
            LessonID: lessonID,
            Title: title,
            Duration: duration,
            ComplexityLevel: complexityLevel,
            LessonType: lessonType,
            Ordinal: ordinal,
            CourseID: courseID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async deleteLesson(lessonID: number) {
        const proc = 'delete_lesson';
        const params = {
            LessonID: lessonID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getAllLessons(courseID: number) {
        const query = `
                    SELECT l.* from Lessons l
                    JOIN Course c on l.CourseID = c.CourseID
                    WHERE c.CourseID = ${courseID}
                    ORDER BY l.Ordinal
        `;
        return await DataConnect.execute(query);
    },

    async getLessonByID(lessonID: number) {
        const query = `
                    SELECT
                    L.LessonID,
                    L.Title AS LessonTitle,
                    L.LessonType,
                    CASE
                        WHEN L.LessonType = 'Video' THEN LV.URL
                        WHEN L.LessonType = 'Document' THEN LD.Content
                        ELSE NULL
                    END AS Content,
                    CASE
                        WHEN L.LessonType = 'Video' THEN LV.LessonVideoID
                        WHEN L.LessonType = 'Document' THEN LD.LessonDocumentID
                        ELSE NULL
                    END AS ResourceID
                        FROM
                            Lessons L
                        LEFT JOIN
                            LessonVideo LV ON L.LessonID = LV.LessonID
                        LEFT JOIN
                            LessonDocument LD ON L.LessonID = LD.LessonID
                        WHERE
                            L.LessonID = ${lessonID}
        `;
        const params = { LessonID: lessonID };
        return await DataConnect.executeWithParams(query, params);
    },

    async sortLessons(lessonID: number, ordinal: number) {
        const query = `
        UPDATE Lessons
        SET Ordinal = ${ordinal}
        WHERE LessonID = ${lessonID}
        `;
        return await DataConnect.execute(query);
    },
};

export default LessonRepository;
