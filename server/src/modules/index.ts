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
  CourseDTO_Factory,
  CourseCommandFactory,
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

// Export all modules
export {
  // Course module
  Course,
  CourseTitle,
  CourseDescription,
  CoursePrice,
  CourseService,
  CourseFactory,
  CourseDTO_Factory,
  CourseCommandFactory,
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
  AIMessage
};