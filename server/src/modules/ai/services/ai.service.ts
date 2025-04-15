/**
 * AI Service
 *
 * This file defines the service layer for the AI domain, containing business logic.
 */

import { AIMessage } from '../domain/ai';
import { chatWithGroq } from '../infrastructure/grpc';
import { getHelloWorld, getUserById, getAllUsers, User } from '../infrastructure/graphql';

// Service interface
export interface IAIService {
  chatWithGroq(message: string): Promise<AIMessage>;
  getHelloWorld(): Promise<string>;
  getUserById(id: string): Promise<User>;
  getAllUsers(): Promise<User[]>;
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

  async getHelloWorld(): Promise<string> {
    try {
      return await getHelloWorld();
    } catch (error) {
      console.error('Error in AI service getHelloWorld:', error);
      throw new Error('Failed to communicate with GraphQL service');
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      return await getUserById(id);
    } catch (error) {
      console.error('Error in AI service getUserById:', error);
      throw new Error('Failed to fetch user from GraphQL service');
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await getAllUsers();
    } catch (error) {
      console.error('Error in AI service getAllUsers:', error);
      throw new Error('Failed to fetch users from GraphQL service');
    }
  }
}

// Export a singleton instance
export default new AIService();
