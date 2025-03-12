import axiosinstance from "./axios.config";

const InstructorService = {
    // Course management
    createCourse: async ( title, topic, description, image, instructorID ) => {
        const response = await axiosinstance.post("/instructor/course/create", {
            title,
            topic,
            description,
            image,
            price: 0,
            instructorID
        });
        return response;
    },

    updateCourse: async (courseData) => {
        const response = await axiosinstance.post("/instructor/course/update", courseData);
        return response;
    },

    getCourseByID: async (courseID) => {
        const response = await axiosinstance.post("/instructor/course/get", { courseID });
        return response;
    },

    getAllCourses: async () => {
        const response = await axiosinstance.post("/instructor/course/getAll");
        return response;
    },

    // Lesson management
    createLessonVideo: async (lessonData) => {
        const response = await axiosinstance.post("/instructor/lesson/video/create", lessonData);
        return response;
    },

    updateLessonVideo: async (lessonVideoID, url) => {
        const response = await axiosinstance.post("/instructor/lesson/video/update", { lessonVideoID, url });
        return response;
    },

    createLessonDocument: async (lessonData) => {
        const response = await axiosinstance.post("/instructor/lesson/document/create", lessonData);
        return response;
    },

    updateLessonDocument: async (lessonDocumentID, documentContent) => {
        const response = await axiosinstance.post("/instructor/lesson/document/update", { lessonDocumentID, documentContent });
        return response;
    },

    deleteLesson: async (lessonID) => {
        const response = await axiosinstance.post("/instructor/lesson/delete", { lessonID });
        return response;
    },

    getAllLessonsByCourseID: async (courseID) => {
        const response = await axiosinstance.post("/instructor/lesson/get-all-lesson-course-id", { courseID });
        return response;
    },

    getLessonByID: async (lessonID) => {
        const response = await axiosinstance.post("/instructor/lesson/get-lesson-by-id", { lessonID });
        return response;
    },

    sortLessons: async (lessonID, ordinal) => {
        const response = await axiosinstance.post("/instructor/lesson/sort", { lessonID, ordinal });
        return response;
    },

}

export default InstructorService;