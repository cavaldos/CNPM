/**
 * Enrollment Routes
 * 
 * This file defines the routes for the Enrollment domain.
 */

import { Router } from 'express';
import EnrollmentController from './enrollment.co';

const EnrollmentRouter = Router();

// Enrollment routes
EnrollmentRouter.post('/create', EnrollmentController.createEnrollment);
EnrollmentRouter.post('/delete', EnrollmentController.deleteEnrollment);
EnrollmentRouter.post('/update-status', EnrollmentController.updateEnrollmentStatus);
EnrollmentRouter.post('/get-by-student-id', EnrollmentController.getAllEnrollmentsByStudent);
EnrollmentRouter.post('/get-contacts', EnrollmentController.getContacts);
EnrollmentRouter.post('/check', EnrollmentController.checkEnrollment);

export default EnrollmentRouter;
