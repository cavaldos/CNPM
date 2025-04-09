import { Router } from "express";
import AdminRouter from "./admin.route";
import InstructorRouter from "./instructor.route";
import StudentRouter from "./student.route";
import PublicRouter from "./public.route";
import AuthRouter from "./auth.route";
import AIRouter from "./ai.route";

const router = Router();

// Mounting all routes
router.use("/auth", AuthRouter);
router.use("/public", PublicRouter);
router.use("/admin", AdminRouter);
router.use("/instructor", InstructorRouter);
router.use("/student", StudentRouter);
router.use("/ai", AIRouter);

export default router;