/**
 * Modules Index
 *
 * This file exports all DDD modules for easier imports.
 */

// Course module
import {
  Course,
  CourseTitle,
  CourseDescription,
  CoursePrice,
  CourseService,
  CourseFactory,
  CourseRepository,
  CourseController,
  courseRoutes
} from './course';

// Lesson module
import {
  Lesson,
  LessonTitle,
  LessonComplexity,
  LessonType,
  LessonService,
  LessonFactory,
  LessonRepository
} from './lesson';

// AI module
import aiRoutes from './ai/ai.route';
import AIController from './ai/controllers/ai.co';
import AIService from './ai/services/ai.service';
import { AIMessage } from './ai/domain/ai';

// Learning module
import {
  LearningProgress,
  Enrollment as LearningEnrollment,
  ProcessStatus as LearningProcessStatus,
  LearningService,
  LearningFactory,
  LearningRepository,
  LearningController,
  learningRoutes
} from './learning';

// Enrollment module
import {
  Enrollment,
  EnrollmentStatus,
  EnrollmentService,
  EnrollmentFactory,
  EnrollmentRepository,
  EnrollmentController,
  enrollmentRoutes
} from './enrollment';

// LearnProgress module
import {
  LearnProgress,
  ProcessStatus,
  LearnProgressService,
  LearnProgressFactory,
  LearnProgressRepository,
  LearnProgressController,
  learnProgressRoutes
} from './learnProgress';

// Statistics module
import {
  StatisticsService,
  StatisticsController,
  statisticsRoutes,
  StatisticsRepository,
  RevenueStatisticsDTO,
  KeywordTrendDTO,
  MonthlyRevenueDTO,
  CourseRevenueDTO
} from './statistics';

// Export all modules
export {
  // Course module
  Course,
  CourseTitle,
  CourseDescription,
  CoursePrice,
  CourseService,
  CourseFactory,
  CourseRepository,
  CourseController,
  courseRoutes,

  // Lesson module
  Lesson,
  LessonTitle,
  LessonComplexity,
  LessonType,
  LessonService,
  LessonFactory,
  LessonRepository,

  // AI module
  aiRoutes,
  AIController,
  AIService,
  AIMessage,

  // Learning module
  LearningProgress,
  LearningEnrollment,
  LearningProcessStatus,
  LearningService,
  LearningFactory,
  LearningRepository,
  LearningController,
  learningRoutes,

  // Enrollment module
  Enrollment,
  EnrollmentStatus,
  EnrollmentService,
  EnrollmentFactory,
  EnrollmentRepository,
  EnrollmentController,
  enrollmentRoutes,

  // LearnProgress module
  LearnProgress,
  ProcessStatus,
  LearnProgressService,
  LearnProgressFactory,
  LearnProgressRepository,
  LearnProgressController,
  learnProgressRoutes,

  // Statistics module
  StatisticsService,
  StatisticsController,
  statisticsRoutes,
  StatisticsRepository,
  RevenueStatisticsDTO,
  KeywordTrendDTO,
  MonthlyRevenueDTO,
  CourseRevenueDTO
};