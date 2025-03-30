import axiosinstance from "./axios.config";

const AdminService = {
    getAllUsers: async () => {
        const response = await axiosinstance.get("/admin/users");
        return response;
    },
    getUserById: async (id) => {
        const response = await axiosinstance.get(`/admin/users/${id}`);
        return response;
    }
    , course: {
        getCoursesOffset: async (page, pageSize) => {
            const response = await axiosinstance.post("/public/course/get-courses-offset", {
                page,
                pageSize
            });
            return response;
        },
    }
}
export default AdminService;