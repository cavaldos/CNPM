/**
 * Modules Index
 *
 * This file exports all DDD modules for easier imports.
 */

// User module
import userRoutes from './user/routes/user.route';
import UserController from './user/controllers/user.co';
import UserService from './user/services/user.service';
import UserRepository from './user/repositories/user.repo';
import { User, UserRole } from './user/domain/user';

// Course module
import courseRoutes from './course/routes/course.route';
import CourseController from './course/controllers/course.co';
import CourseService from './course/services/course.service';
import CourseRepository from './course/repositories/course.repo';
import { Course } from './course/domain/course';

// AI module
import aiRoutes from './ai/routes/ai.route';
import AIController from './ai/controllers/ai.co';
import AIService from './ai/services/ai.service';
import { AIMessage } from './ai/domain/ai';

// Review module
import reviewRouter from './review/review.route';
import ReviewController from './review/review.co';
import ReviewService from './review/review.service';
import ReviewRepository from './review/review.repo';
import { Review } from './review/review';

// Lesson module
import lessonRouter from './lesson/lesson.route';
import LessonController from './lesson/lesson.co';
import LessonService from './lesson/lesson.service';
import LessonRepository from './lesson/lesson.repo';
import { Lesson, VideoLesson, DocumentLesson, LessonType, ComplexityLevel, createLesson } from './lesson/lesson';

// Enrollment module
import enrollmentRouter from './enrollment/enrollment.route';
import EnrollmentController from './enrollment/enrollment.co';
import EnrollmentService from './enrollment/enrollment.service';
import EnrollmentRepository from './enrollment/enrollment.repo';
import { Enrollment, EnrollmentStatus } from './enrollment/enrollment';

// Export all modules
export {
  // User module
  userRoutes,
  UserController,
  UserService,
  UserRepository,
  User,
  UserRole,

  // Course module
  courseRoutes,
  CourseController,
  CourseService,
  CourseRepository,
  Course,

  // AI module
  aiRoutes,
  AIController,
  AIService,
  AIMessage,

  // Review module
  reviewRouter as reviewRoutes,
  ReviewController,
  ReviewService,
  ReviewRepository,
  Review,

  // Lesson module
  lessonRouter as lessonRoutes,
  LessonController,
  LessonService,
  LessonRepository,
  Lesson,
  VideoLesson,
  DocumentLesson,
  LessonType,
  ComplexityLevel,
  createLesson,

  // Enrollment module
  enrollmentRouter as enrollmentRoutes,
  EnrollmentController,
  EnrollmentService,
  EnrollmentRepository,
  Enrollment,
  EnrollmentStatus
};
