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
router.post('/update', EnrollmentController.updateEnrollmentStatus);
router.post('/delete', EnrollmentController.deleteEnrollment);
router.post('/get-all', EnrollmentController.getAllEnrollmentsByStudent);
router.post('/check', EnrollmentController.checkEnrollment);
router.post('/contacts', EnrollmentController.getContacts);
router.post('/complete', EnrollmentController.completeEnrollment);

export default router;
