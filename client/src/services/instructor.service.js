import axiosinstance from "./axios.config";

const InstructorService = {
    getAllUsers: async () => {
        const response = await axiosinstance.get("/admin/users");
        return response;
    },
    getUserById: async (id) => {
        const response = await axiosinstance.get(`/admin/users/${id}`);
        return response;
    }

}
export default InstructorService;