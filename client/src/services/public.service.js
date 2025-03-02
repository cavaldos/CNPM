import axiosinstance from "./axios.config";

const PublicService = {
    guest: {
        getAllUsers: async () => {
            const response = await axiosinstance.get("/admin/users");
            return response;
        },
        getUserById: async (id) => {
            const response = await axiosinstance.get(`/admin/users/${id}`);
            return response;
        }
    }
    ,
    course: {
        getAllCourses: async () => {
            const response = await axiosinstance.get("/admin/users");
            return response;
        }
    }
}
export default PublicService;