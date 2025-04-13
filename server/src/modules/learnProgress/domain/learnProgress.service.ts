/**
 * LearnProgress Service
 * 
 * This file defines the service layer for the LearnProgress domain, containing business logic.
 */

import { LearnProgress, LearnProgressCreatedEvent, LearnProgressUpdatedEvent, LearnProgressCompletedEvent } from './learnProgress';
import LearnProgressRepository from '../repositories/Implement/LearnProgress.repo';
import LearnProgressFactory from './factories/learnProgress.factory';
import { EventEmitter } from 'events';

// Import related modules
import { Lesson, LessonService } from '../../lesson';
import { Enrollment, EnrollmentService } from '../../enrollment';

// Domain event emitter
const eventEmitter = new EventEmitter();

// DTO interfaces
export interface StartLearnProgressDTO {
  lessonID: number;
  studentID: number;
}

export interface UpdateLearnProgressDTO {
  studentID: number;
  lessonID: number;
  processStatus: string;
}

// Service interface
export interface ILearnProgressService {
  startLearnProgress(data: StartLearnProgressDTO): Promise<LearnProgress>;
  updateLearnProgress(data: UpdateLearnProgressDTO): Promise<LearnProgress>;
  deleteLearnProgress(progressID: number): Promise<boolean>;
  getAllLessonInProgress(enrollmentID: number): Promise<LearnProgress[]>;
  getAllCourseProgress(studentID: number): Promise<any[]>;
  completeCourseProgress(enrollmentID: number): Promise<boolean>;
  checkProcessStatus(lessonID: number, studentID: number): Promise<LearnProgress | null>;
}

// Service implementation
class LearnProgressService implements ILearnProgressService {
  async startLearnProgress(data: StartLearnProgressDTO): Promise<LearnProgress> {
    const { lessonID, studentID } = data;
    
    // Check if progress already exists
    const existingProgress = await this.checkProcessStatus(lessonID, studentID);
    if (existingProgress) {
      // If progress exists but is not started, update it to in-process
      if (existingProgress.isNotStarted()) {
        return await this.updateLearnProgress({
          studentID,
          lessonID,
          processStatus: 'InProcess'
        });
      }
      return existingProgress;
    }
    
    // Create new progress
    const result = await LearnProgressRepository.startLearnProgress(lessonID, studentID);
    
    if (!result || result.length === 0) {
      throw new Error('Failed to start learning progress');
    }
    
    // Create domain entity
    const progress = LearnProgressFactory.createLearnProgressFromDB(result[0]);
    
    // Emit domain event
    eventEmitter.emit('learnProgress.created', new LearnProgressCreatedEvent(progress.progressID));
    
    return progress;
  }

  async updateLearnProgress(data: UpdateLearnProgressDTO): Promise<LearnProgress> {
    const { studentID, lessonID, processStatus } = data;
    
    // Update in database
    const result = await LearnProgressRepository.updateLearnProgress(studentID, lessonID, processStatus);
    
    if (!result || result.length === 0) {
      throw new Error('Failed to update learning progress');
    }
    
    // Create domain entity
    const progress = LearnProgressFactory.createLearnProgressFromDB(result[0]);
    
    // Emit domain event
    eventEmitter.emit('learnProgress.updated', new LearnProgressUpdatedEvent(progress.progressID));
    
    // If progress is completed, emit completed event
    if (progress.isCompleted()) {
      eventEmitter.emit('learnProgress.completed', new LearnProgressCompletedEvent(progress.progressID));
    }
    
    return progress;
  }

  async deleteLearnProgress(progressID: number): Promise<boolean> {
    const result = await LearnProgressRepository.deleteLearnProgress(progressID);
    return result && result.length > 0;
  }

  async getAllLessonInProgress(enrollmentID: number): Promise<LearnProgress[]> {
    const results = await LearnProgressRepository.getAllLessonInProgress(enrollmentID);
    
    if (!results || results.length === 0) {
      return [];
    }
    
    // Calculate completion percentage
    const totalLessons = results.length;
    const completedLessons = results.filter(lesson => lesson.ProcessStatus === 'Done').length;
    const percentageComplete = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    // Add percentage to each progress
    const progressList = results.map(result => {
      return LearnProgressFactory.createLearnProgressFromDB({
        ...result,
        PercentageComplete: percentageComplete
      });
    });
    
    return progressList;
  }

  async getAllCourseProgress(studentID: number): Promise<any[]> {
    const results = await LearnProgressRepository.getAllCourseProgress(studentID);
    
    if (!results || results.length === 0) {
      return [];
    }
    
    return results;
  }

  async completeCourseProgress(enrollmentID: number): Promise<boolean> {
    const result = await LearnProgressRepository.updateCourceProgress(enrollmentID);
    return result && result.length > 0;
  }

  async checkProcessStatus(lessonID: number, studentID: number): Promise<LearnProgress | null> {
    const result = await LearnProgressRepository.checkProcessStatus(lessonID, studentID);
    
    if (!result || result.length === 0) {
      return null;
    }
    
    return LearnProgressFactory.createLearnProgressFromDB(result[0]);
  }
}

// Export a singleton instance
export default new LearnProgressService();
