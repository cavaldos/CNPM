import DataConnect from '../../utils/DataConnect';

const CourseRepository = {
    async getCourseByID(courseID: number) {
        //  chua xong
        const query = 'SELECT * FROM Course WHERE CourseID = @CourseID';
        const params = {
            CourseID: courseID
        };

        return await DataConnect.executeWithParams(query, params);
    },

    async getAllCourses() {
        const query = 'SELECT * FROM Course';
        return await DataConnect.execute(query)
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
