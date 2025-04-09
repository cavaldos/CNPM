/**
 * User Service
 * 
 * This file defines the service layer for the User domain, containing business logic.
 */

import { User } from '../domain/user';
import UserRepository from '../repositories/user.repo';

// Service interface
export interface IUserService {
  createUser(userName: string, email: string, fullName: string, role: string): Promise<any>;
  updateUser(userID: number, userName: string, email: string, fullName: string, role: string): Promise<any>;
  deleteUser(userID: number): Promise<any>;
  getAllUsers(): Promise<User[]>;
  getUserById(userID: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
}

// Service implementation
class UserService implements IUserService {
  async createUser(userName: string, email: string, fullName: string, role: string): Promise<any> {
    // Validate input
    if (!userName || !email || !fullName || !role) {
      throw new Error('All fields are required');
    }

    // Check if user with email already exists
    const existingUser = await UserRepository.getByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create user
    return await UserRepository.create(userName, email, fullName, role);
  }

  async updateUser(userID: number, userName: string, email: string, fullName: string, role: string): Promise<any> {
    // Validate input
    if (!userID || !userName || !email || !fullName || !role) {
      throw new Error('All fields are required');
    }

    // Check if user exists
    const existingUser = await UserRepository.getById(userID);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Update user
    return await UserRepository.update(userID, userName, email, fullName, role);
  }

  async deleteUser(userID: number): Promise<any> {
    // Validate input
    if (!userID) {
      throw new Error('User ID is required');
    }

    // Check if user exists
    const existingUser = await UserRepository.getById(userID);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Delete user
    return await UserRepository.delete(userID);
  }

  async getAllUsers(): Promise<User[]> {
    return await UserRepository.getAll();
  }

  async getUserById(userID: number): Promise<User | null> {
    if (!userID) {
      throw new Error('User ID is required');
    }
    return await UserRepository.getById(userID);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new Error('Email is required');
    }
    return await UserRepository.getByEmail(email);
  }
}

// Export a singleton instance
export default new UserService();
