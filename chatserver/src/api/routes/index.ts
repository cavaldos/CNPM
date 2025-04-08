import { Router } from "express";
import MessageRouter from "./message.route";
import AIRouter from "./ai.route";
const router = Router();

router.use("/messages", MessageRouter);
router.use("/ai", AIRouter);

export default router;
