import { Router } from 'express';
import AIController from '../controller/AI.co';

const AIRouter = Router();

// Route to chat with Groq AI
AIRouter.post('/groq', AIController.chatWithGroq);

export default AIRouter;
