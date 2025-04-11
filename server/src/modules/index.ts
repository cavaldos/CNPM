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
import CourseRepository from './course/repositories/Implement/Course.repo';
import { Course } from './course/domain/course';

// AI module
import aiRoutes from './ai/routes/ai.route';
import AIController from './ai/controllers/ai.co';
import AIService from './ai/services/ai.service';
import { AIMessage } from './ai/domain/ai';

// Review module
import reviewRouter from './review/routes/review.route';
import ReviewController from './review/controllers/review.co';
import ReviewService from './review/services/review.service';
import ReviewRepository from './review/repositories/review.repo';
import { Review } from './review/domain/review';

// Lesson module
import lessonRouter from './lesson/routes/lesson.route';
import LessonController from './lesson/controllers/lesson.co';
import LessonService from './lesson/services/lesson.service';
import LessonRepository from './lesson/repositories/lesson.repo';
import { Lesson, VideoLesson, DocumentLesson, LessonType, ComplexityLevel, createLesson } from './lesson/domain/lesson';

// Enrollment module
import enrollmentRouter from './enrollment/routes/enrollment.route';
import EnrollmentController from './enrollment/controllers/enrollment.co';
import EnrollmentService from './enrollment/services/enrollment.service';
import EnrollmentRepository from './enrollment/repositories/enrollment.repo';
import { Enrollment, EnrollmentStatus } from './enrollment/domain/enrollment';

// Learning module
import learningRouter from './learning/routes/learning.route';
import LearningController from './learning/controllers/learning.co';
import LearningService from './learning/services/learning.service';
import LearningRepository from './learning/repositories/learning.repo';
import { LearningProgress, LearningStatus, CourseProgress } from './learning/domain/learning';

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
  EnrollmentStatus,

  // Learning module
  learningRouter as learningRoutes,
  LearningController,
  LearningService,
  LearningRepository,
  LearningProgress,
  LearningStatus,
  CourseProgress
};
