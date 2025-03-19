import { Router } from "express";
import MessageRouter from "./message.route";
const router = Router();

router.use("/messages", MessageRouter);

export default router;
