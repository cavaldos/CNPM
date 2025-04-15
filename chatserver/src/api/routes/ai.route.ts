import express from "express";
import { chatWithGroq } from "../controllers/ai.co";

const AIRouter = express.Router();

AIRouter.post("/groq", chatWithGroq);

export default AIRouter;