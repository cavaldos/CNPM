import express from "express";
import { createUser, getUserById, getAllUsers } from "../controllers/user.co";

const UserRouter = express.Router();

// Create a new user
UserRouter.post("/", createUser);

// Get user by ID
UserRouter.get("/:id", getUserById);

// Get all users
UserRouter.get("/", getAllUsers);

export default UserRouter;
