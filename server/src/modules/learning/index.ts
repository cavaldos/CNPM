/**
 * Learning Module Index
 * 
 * This file exports all components of the Learning module for easier imports.
 */

// Domain
import { LearningProgress, Enrollment, ProcessStatus } from './domain/learning';
import LearningService from './domain/learning.service';

// Factories
import LearningFactory from './domain/factories/learning.factory';

// Infrastructure
import LearningRepository from './repositories/Implement/Learning.repo';

// Presentation
import LearningController from './controllers/learning.co';
import learningRoutes from './routes/learning.route';

// Export all components
export {
  // Domain
  LearningProgress,
  Enrollment,
  ProcessStatus,
  LearningService,
  
  // Factories
  LearningFactory,
  
  // Infrastructure
  LearningRepository,
  
  // Presentation
  LearningController,
  learningRoutes
};
