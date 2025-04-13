/**
 * Course Module Index
 *
 * This file exports all components of the Course module for easier imports.
 */

// Domain
import { Course, CourseTitle, CourseDescription, CoursePrice } from './domain/course';
import CourseService from './domain/course.service';

// Factories
import { CourseFactory } from './domain/factories';

// Infrastructure
import CourseRepository from './repositories/Implement/Course.repo';

// Presentation
import CourseController from './controllers/course.co';
import courseRoutes from './routes/course.route';

// Export all components
export {
  // Domain
  Course,
  CourseTitle,
  CourseDescription,
  CoursePrice,
  CourseService,

  // Factories
  CourseFactory,

  // Infrastructure
  CourseRepository,

  // Presentation
  CourseController,
  courseRoutes
};
