/**
 * AI Routes
 * 
 * This file defines the routes for the AI domain.
 */

import { Router } from 'express';
import AIController from '../controllers/ai.co';

const router = Router();

// AI routes
router.post('/groq', AIController.chatWithGroq);

export default router;
