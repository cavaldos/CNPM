import { Router } from "express";
import AuthController from "../controller/Auth.co";
import authMiddleware from "../middleware/auth.middleware";
const AuthRouter = Router();

// Authentication routes
// Đã comment các route đăng ký/đăng nhập vì dùng xác thực bên thứ 3
// AuthRouter.post("/register", AuthController.register);
// AuthRouter.post("/login", AuthController.login);
AuthRouter.post("/check-user", AuthController.getUserInfo);
AuthRouter.post("/signin", authMiddleware, AuthController.signIn);

export default AuthRouter;