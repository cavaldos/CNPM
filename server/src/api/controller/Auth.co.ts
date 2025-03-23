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
    async signIn(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const { displayName, idToken } = req.user;
            const email = req.user.email || '';
            const { role } = req.body;


            // Check if the user already exists in our database
            const existingUser = await UserRepository.getUserByEmail(email as string || '');
            console.log("Existing user:", existingUser);
            if (!existingUser || existingUser.length === 0) {
                const userName = email.split('@')[0] || '';
                const fullName = displayName || userName;
                const userRole = role || 'Student'; // Default role if not specified

                 await UserRepository.createUser(userName, email, fullName, userRole);
                const returnUser = await UserRepository.getUserByEmail(email as string || '');

                return res.status(201).json({
                    message: "User account created successfully",
                    data: returnUser[0],
                    idToken: idToken,
                });
            } else {
                // User exists, sign them in
                const userData = existingUser[0];

                return res.status(200).json({
                    message: "User signed in successfully",
                    data: userData,
                    idToken: idToken,
                });
            }
        } catch (error) {
            console.error("Error during sign in:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    },


};

export default AuthController;