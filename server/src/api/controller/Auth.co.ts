import { Request, Response } from "express";
import UserRepository from "../repositories/user";

const AuthController = {

    async getUserInfo(req: Request, res: Response) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            const user = await UserRepository.getUserByEmail(email);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({
                message: "User retrieved successfully",
                data: user[0],
            });
        } catch (error) {
            console.error("Error retrieving user:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },


};

export default AuthController;