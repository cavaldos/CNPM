/**
 * AI Service
 *
 * This file defines the service layer for the AI domain, containing business logic.
 */

import { AIMessage } from '../domain/ai';
import { chatWithGroq } from '../infrastructure/grpc';

// Service interface
export interface IAIService {
  chatWithGroq(message: string): Promise<AIMessage>;
}

// Service implementation
class AIService implements IAIService {
  async chatWithGroq(message: string): Promise<AIMessage> {
    if (!message) {
      throw new Error('Message is required');
    }

    try {
      const response = await chatWithGroq(message);
      return new AIMessage(message, response);
    } catch (error) {
      console.error('Error in AI service:', error);
      throw new Error('Failed to communicate with AI service');
    }
  }
}

// Export a singleton instance
export default new AIService();
