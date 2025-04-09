/**
 * User Controller
 * 
 * This file defines the controller layer for the User domain, handling HTTP requests.
 */

import { Request, Response } from 'express';
import UserService from '../services/user.service';

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { userName, email, fullName, role } = req.body;
      const result = await UserService.createUser(userName, email, fullName, role);

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create user',
        error: error
      });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { userID, userName, email, fullName, role } = req.body;
      const result = await UserService.updateUser(userID, userName, email, fullName, role);

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update user',
        error: error
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { userID } = req.body;
      const result = await UserService.deleteUser(userID);

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete user',
        error: error
      });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();

      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        data: users.map(user => user.toDTO())
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to retrieve users',
        error: error
      });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { userID } = req.body;
      const user = await UserService.getUserById(userID);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: user.toDTO()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to retrieve user',
        error: error
      });
    }
  }

  async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User retrieved successfully',
        data: user.toDTO()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to retrieve user',
        error: error
      });
    }
  }
}

// Export a singleton instance
export default new UserController();
