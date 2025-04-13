/**
 * Enrollment Module Index
 * 
 * This file exports all components of the Enrollment module for easier imports.
 */

// Domain
import { Enrollment, EnrollmentStatus } from './domain/enrollment';
import EnrollmentService from './domain/enrollment.service';

// Factories
import EnrollmentFactory from './domain/factories/enrollment.factory';

// Infrastructure
import EnrollmentRepository from './repositories/Implement/Enrollment.repo';

// Presentation
import EnrollmentController from './controllers/enrollment.co';
import enrollmentRoutes from './routes/enrollment.route';

// Export all components
export {
  // Domain
  Enrollment,
  EnrollmentStatus,
  EnrollmentService,
  
  // Factories
  EnrollmentFactory,
  
  // Infrastructure
  EnrollmentRepository,
  
  // Presentation
  EnrollmentController,
  enrollmentRoutes
};
