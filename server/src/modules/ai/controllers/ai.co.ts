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

  async helloWorld(req: Request, res: Response): Promise<void> {
    try {
      console.log('Received hello world request');

      const message = await AIService.getHelloWorld();

      res.status(200).json({
        success: true,
        message: 'Hello world request successful',
        data: {
          result: message
        }
      });
    } catch (error: any) {
      console.error('Error in helloWorld controller:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      console.log('Received get user request for ID:', id);

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'User ID is required'
        });
        return;
      }

      const user = await AIService.getUserById(id);

      res.status(200).json({
        success: true,
        message: 'User fetched successfully',
        data: {
          user
        }
      });
    } catch (error: any) {
      console.error('Error in getUser controller:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      console.log('Received get all users request');

      const users = await AIService.getAllUsers();

      res.status(200).json({
        success: true,
        message: 'Users fetched successfully',
        data: {
          users
        }
      });
    } catch (error: any) {
      console.error('Error in getUsers controller:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Internal server error'
      });
    }
  }
}

// Export a singleton instance
export default new AIController();
