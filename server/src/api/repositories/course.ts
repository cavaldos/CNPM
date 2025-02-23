import DataConnect from '../../utils/DataConnect';

const CourseRepository = {
    async getCourseByID(courseID: number) {
        const query = `
            SELECT c.*, 
                   u.FullName as InstructorName,
                   (SELECT COUNT(*) FROM Review r WHERE r.CourseID = c.CourseID) as ReviewCount,
                   (SELECT COUNT(*) FROM Lessons l WHERE l.CourseID = c.CourseID) as LessonCount
            FROM Course c
            INNER JOIN [User] u ON c.InstructorID = u.UserID
            WHERE c.CourseID = @CourseID
        `;
        const params = {
            CourseID: courseID
        };
        return await DataConnect.executeWithParams(query, params);
    },

    async getAllCourses() {
        const query = `
            SELECT c.*, 
                   u.FullName as InstructorName,
                   (SELECT COUNT(*) FROM Review r WHERE r.CourseID = c.CourseID) as ReviewCount,
                   (SELECT COUNT(*) FROM Lessons l WHERE l.CourseID = c.CourseID) as LessonCount
            FROM Course c
            INNER JOIN [User] u ON c.InstructorID = u.UserID
            ORDER BY c.CreateTime DESC
        `;
        return await DataConnect.execute(query);
    },

    async createCourse(title: string, topic: string, description: string, image: string, price: number, instructorID: number) {
        const proc = 'create_course'
        const params = {
            Title: title,
            Topic: topic,
            Description: description,
            Image: image,
            Price: price,
            InstructorID: instructorID,
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateCourse(courseID: number, title: string, topic: string, description: string, image: string, price: number, instructorID: number) {
        const proc = 'update_course';
        const params = {
            CourseID: courseID,
            Title: title,
            Topic: topic,
            Description: description,
            Image: image,
            Price: price,
            InstructorID: instructorID,
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async deleteCourse(courseID: number) {
        const proc = 'delete_course';
        const params = {
            CourseID: courseID
        };
        return await DataConnect.executeProcedure(proc, params);
    },
};

export default CourseRepository;
