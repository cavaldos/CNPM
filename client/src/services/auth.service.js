
import axiosinstance from "./axios.config";

const AuthService = {
    getInfo: async (email) => {
        const response = await axiosinstance.post("/auth/get-info", { email });
        return response;
    },

}
export default AuthService;