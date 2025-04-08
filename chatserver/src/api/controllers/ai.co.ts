import { Request, Response } from "express";
import GroqAI from "../../utils/groq";

export const chatWithGroq = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Message is required"
            });
        }

        const response = await GroqAI(message);

        return res.status(200).json({
            success: true,
            message: "Chat successful",
            data: {
                response
            }
        });
    } catch (error) {
        console.error("Error in chatWithGroq:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};