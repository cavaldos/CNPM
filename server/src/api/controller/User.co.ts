import { Request, Response } from "express";
import UserRepository from "../repositories/user";

const UserController = {
    createUser: async (req: Request, res: Response) => {
        try {
            const { userName, email, fullName, role } = req.body;
            const result = await UserRepository.createUser(userName, email, fullName, role);
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to create user",
                error: error
            });
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const { userID, userName, email, fullName, role } = req.body;
            const result = await UserRepository.updateUser(userID, userName, email, fullName, role);
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to update user",
                error: error
            });
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const { userID } = req.body;
            const result = await UserRepository.deleteUser(userID);
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Failed to delete user",
                error: error
            });
        }
    }
};

export default UserController;
