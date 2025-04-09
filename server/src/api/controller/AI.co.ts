import { Request, Response } from 'express';
import { chatWithGroq } from '../../grpc/client';

const AIController = {
  chatWithGroq: async (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      console.log('Received message:', message);

      if (!message) {
        return res.status(400).json({
          success: false,
          message: 'Message is required',
        });
      }

      const response = await chatWithGroq(message);

      return res.status(200).json({
        success: true,
        message: 'Chat successful',
        data: {
          response,
        },
      });
    } catch (error) {
      console.error('Error in chatWithGroq controller:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  },
};

export default AIController;
