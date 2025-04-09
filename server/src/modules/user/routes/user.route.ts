/**
 * User Routes
 * 
 * This file defines the routes for the User domain.
 */

import { Router } from 'express';
import UserController from '../controllers/user.co';

const router = Router();

// User routes
router.post('/create', UserController.createUser);
router.post('/update', UserController.updateUser);
router.post('/delete', UserController.deleteUser);
router.post('/getAll', UserController.getAllUsers);
router.post('/get', UserController.getUserById);
router.post('/getByEmail', UserController.getUserByEmail);

export default router;
