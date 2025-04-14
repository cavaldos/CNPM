import { Request, Response } from "express";
import UserRepo from "../repository/user.repo";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, fullName, age, role } = req.body;

    // Validate required fields
    if (!username || !email || !fullName) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and fullName are required",
      });
    }

    // Check if user already exists
    const existingUser = await UserRepo.getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const newUser = await UserRepo.createUser({
      username,
      email,
      fullName,
      age,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UserRepo.getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error in getUserById:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserRepo.getAllUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
