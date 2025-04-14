import { Router } from "express";
import MessageRouter from "./message.route";
import AIRouter from "./ai.route";
import UserRouter from "./user.route";
const router = Router();

router.use("/messages", MessageRouter);
router.use("/ai", AIRouter);
router.use("/users", UserRouter);

export default router;
