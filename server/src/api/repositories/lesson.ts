import DataConnect from '../../utils/DataConnect';

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

    async getAllLessons() {
        const query = `
            SELECT l.*, 
                   lv.URL as VideoURL,
                   ld.Content as DocumentContent,
                   c.Title as CourseName
            FROM [Lessons] l
            LEFT JOIN [LessonVideo] lv ON l.LessonID = lv.LessonID
            LEFT JOIN [LessonDocument] ld ON l.LessonID = ld.LessonID
            INNER JOIN [Course] c ON l.CourseID = c.CourseID
            ORDER BY l.CreatedTime DESC
        `;
        return await DataConnect.execute(query);
    },

    async getLessonByID(lessonID: number) {
        const query = `
            SELECT l.*, 
                   lv.URL as VideoURL,
                   ld.Content as DocumentContent,
                   c.Title as CourseName
            FROM [Lessons] l
            LEFT JOIN [LessonVideo] lv ON l.LessonID = lv.LessonID
            LEFT JOIN [LessonDocument] ld ON l.LessonID = ld.LessonID
            INNER JOIN [Course] c ON l.CourseID = c.CourseID
            WHERE l.LessonID = @LessonID
        `;
        const params = { LessonID: lessonID };
        return await DataConnect.executeWithParams(query, params);
    }
};

export default LessonRepository;
