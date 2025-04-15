/**
 * LearnProgress Module Index
 * 
 * This file exports all components of the LearnProgress module for easier imports.
 */

// Domain
import { LearnProgress, ProcessStatus } from './domain/learnProgress';
import LearnProgressService from './domain/learnProgress.service';

// Factories
import LearnProgressFactory from './domain/factories/learnProgress.factory';

// Infrastructure
import LearnProgressRepository from './repositories/Implement/LearnProgress.repo';

// Presentation
import LearnProgressController from './controllers/learnProgress.co';
import learnProgressRoutes from './routes/learnProgress.route';

// Export all components
export {
  // Domain
  LearnProgress,
  ProcessStatus,
  LearnProgressService,
  
  // Factories
  LearnProgressFactory,
  
  // Infrastructure
  LearnProgressRepository,
  
  // Presentation
  LearnProgressController,
  learnProgressRoutes
};
