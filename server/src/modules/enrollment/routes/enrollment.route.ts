/**
 * Enrollment Routes
 * 
 * This file defines the routes for the Enrollment domain.
 */

import { Router } from 'express';
import EnrollmentController from '../controllers/enrollment.co';

const router = Router();

// Enrollment routes
router.post('/create', EnrollmentController.createEnrollment);
router.post('/delete', EnrollmentController.deleteEnrollment);
router.post('/update-status', EnrollmentController.updateEnrollmentStatus);
router.post('/get-by-student-id', EnrollmentController.getAllEnrollmentsByStudent);
router.post('/get-contacts', EnrollmentController.getContacts);
router.post('/check', EnrollmentController.checkEnrollment);

export default router;
