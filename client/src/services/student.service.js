import axiosinstance from "./axios.config";

const StudentService = {
    getAllUsers: async () => {
        const response = await axiosinstance.get("/admin/users");
        return response;
    },
    getUserById: async (id) => {
        const response = await axiosinstance.get(`/admin/users/${id}`);
        return response;
    },
    getCourseDetail: async (courseId) => {
        try {
            const response = await axiosinstance.get(`/student/courses/${courseId}`);
            return {
                success: true,
                data: response.data,
                message: "Course data retrieved successfully"
            };
        } catch (error) {
            console.error("Error fetching course details:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Failed to get course details"
            };
        }
    },
    getAllCourseProgress: async (studentID) => {
        try {
            const response = await axiosinstance.post(`/student/progress/get-all`, { studentID });
            return {
                success: true,
                data: response.data,
                message: "Course progress retrieved successfully"

            };
        } catch (error) {
            console.error("Error retrieving course progress:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Failed to retrieve course progress"
            };
        }
    },
    lesson: {
        getAllLessons: async (courseID) => {
            try {
                const response = await axiosinstance.post(`/student/lesson/get-all-lessons`, { courseID });
                return {
                    success: true,
                    data: response.data,
                    message: "Lessons retrieved successfully"
                };
            } catch (error) {
                console.error("Error fetching lessons:", error);
                return {
                    success: false,
                    message: error.response?.data?.message || "Failed to get lessons"
                };
            }
        },
        getLessonById: async (lessonID) => {
            const response = await axiosinstance.post(`/student/lesson/get-lesson-by-id`, { lessonID });
            return response;
        }
    },
    checkEnrollment: async (courseId) => {
        try {
            const response = await axiosinstance.get(`/student/enrollment-status/${courseId}`);
            return {
                success: true,
                isEnrolled: response.data.isEnrolled,
                message: "Enrollment status checked successfully"
            };
        } catch (error) {
            console.error("Error checking enrollment status:", error);
            return {
                success: false,
                isEnrolled: false,
                message: error.response?.data?.message || "Failed to check enrollment status"
            };
        }
    }
};

export default StudentService;