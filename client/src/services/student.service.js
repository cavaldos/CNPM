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

                /**
                 * "data": [
        {
            "StudentID": 1,
            "StudentName": "John Doe",
            "CourseID": 1,
            "CourseTitle": "SQL Basics",
            "Topic": "Database",
            "Price": 49.99,
            "EnrollDate": "2025-01-01T14:00:00.000Z",
            "EnrollmentID": 1,
            "EnrollmentStatus": "Enrolled"
        },
        {
            "StudentID": 1,
            "StudentName": "John Doe",
            "CourseID": 7,
            "CourseTitle": "Machine Learning",
            "Topic": "AI",
            "Price": 89.99,
            "EnrollDate": "2025-01-07T20:00:00.000Z",
            "EnrollmentID": 7,
            "EnrollmentStatus": "Completed"
        },
        {
            "StudentID": 1,
            "StudentName": "John Doe",
            "CourseID": 10,
            "CourseTitle": "Database Design",
            "Topic": "Database",
            "Price": 59.99,
            "EnrollDate": "2025-01-10T23:00:00.000Z",
            "EnrollmentID": 10,
            "EnrollmentStatus": "Completed"
        }
    ]
                 */
            };
        } catch (error) {
            console.error("Error retrieving course progress:", error);
            return {
                success: false,
                message: error.response?.data?.message || "Failed to retrieve course progress"
            };
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