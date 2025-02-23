import DataConnect from '../../utils/DataConnect';

const CourseRepository = {
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

    async getCourse(courseID: number) {
        //  chua xong
        const proc = 'get_course';
        const params = {
            CourseID: courseID
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async getAllCourses() {
        const query = 'SELECT * FROM Course';
        return await DataConnect.execute(query)
    }
};

export default CourseRepository;
