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
    enrollment: {

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
        },
        create: async (studentID, courseID) => {
            const response = await axiosinstance.post(`/student/enrollment/create`, { studentID, courseID });
            return response
        },
        delete: async (enrollmentID) => {
            const response = await axiosinstance.post(`/student/enrollment/delete`, { enrollmentID });
            return response
        }
        ,
        update: async (enrollmentID, Status) => {
            const response = await axiosinstance.post(`/student/enrollment/update`, { enrollmentID, Status });
            return response;
        },
        getAllEnrollmentsByStudent: async (studentID) => {
            const response = await axiosinstance.post(`/student/enrollment/get-all-enrollments`, { studentID });
            return response;
        },

        getContacts: async (courseID) => {
            const response = await axiosinstance.post(`/student/enrollment/get-contacts`, { courseID });
            return response

        },
    },
    progress: {
        getAllCourseProgress: async (studentID) => {
            try {
                const response = await axiosinstance.post(`/student/progress/get-all`, { studentID });
                return response
            } catch (error) {
                console.error("Error retrieving course progress:", error);
                return {
                    success: false,
                    message: error.response?.data?.message || "Failed to retrieve course progress"
                };
            }
        },
        checkProcessStatus: async (studentID, lessonID) => {
            try {
                const response = await axiosinstance.post(`/student/progress/check-status`, { studentID, lessonID });
                return response
            } catch (error) {
                console.error("Error checking process status:", error);
                return {
                    success: false,
                    message: error.response?.data?.message || "Failed to check process status"
                };
            }
        },
        getAllLessonInProgress: async (enrollmentID) => {
            try {
                const response = await axiosinstance.post(`/student/progress/get-all-lesson-in-progress`, { enrollmentID });
                return response;
            } catch (error) {
                console.error("Error retrieving lessons in progress:", error);
                return {
                    success: false,
                    message: error.response?.data?.message || "Failed to retrieve lessons in progress"
                };
            }
        }
    }
    ,
    course: {
        checkCourseEnrollment: async (courseID, studentID) => {
            const response = await axiosinstance.post(`/student/course/check-course-enrolled`, { courseID, studentID });
            return response;

        }

    }
};

export default StudentService;