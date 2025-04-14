/**
 * AI Controller
 * 
 * This file defines the controller layer for the AI domain, handling HTTP requests.
 */

import { Request, Response } from 'express';
import AIService from '../services/ai.service';

class AIController {
  async chatWithGroq(req: Request, res: Response): Promise<void> {
    try {
      const { message } = req.body;
      console.log('Received message:', message);

      if (!message) {
        res.status(400).json({
          success: false,
          message: 'Message is required'
        });
        return;
      }

      const aiMessage = await AIService.chatWithGroq(message);

      res.status(200).json({
        success: true,
        message: 'Chat successful',
        data: {
          result: aiMessage.response
        }
      });
    } catch (error: any) {
      console.error('Error in chatWithGroq controller:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }
}

// Export a singleton instance
export default new AIController();
