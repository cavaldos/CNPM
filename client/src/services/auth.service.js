
import axiosinstance from "./axios.config";

const AuthService = {
    checkUser: async (email) => {
        const response = await axiosinstance.post("/auth/check-user", { email });
        return response;
    },
    signin: async (role) => {
        const response = await axiosinstance.post("/auth/signin", { role });
        return response;
    }

}
export default AuthService;