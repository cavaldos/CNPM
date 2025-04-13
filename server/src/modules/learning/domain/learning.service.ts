/**
 * Learning Service
 * 
 * This file defines the service layer for the Learning domain, containing business logic.
 */

import { LearningProgress, Enrollment, LearningProgressCreatedEvent, LearningProgressUpdatedEvent, LearningProgressCompletedEvent } from './learning';
import LearningRepository from '../repositories/Implement/Learning.repo';
import LearningFactory from './factories/learning.factory';
import { EventEmitter } from 'events';

// Import related modules
import { Course, CourseService } from '../../course';
import { Lesson, LessonService } from '../../lesson';

// Domain event emitter
const eventEmitter = new EventEmitter();

// DTO interfaces
export interface StartLearningProgressDTO {
  lessonID: number;
  studentID: number;
}

export interface UpdateLearningProgressDTO {
  studentID: number;
  lessonID: number;
  processStatus: string;
}

export interface CreateEnrollmentDTO {
  studentID: number;
  courseID: number;
}

export interface UpdateEnrollmentStatusDTO {
  enrollmentID: number;
  status: string;
}

// Service interface
export interface ILearningService {
  // Learning Progress methods
  startLearningProgress(data: StartLearningProgressDTO): Promise<LearningProgress>;
  updateLearningProgress(data: UpdateLearningProgressDTO): Promise<LearningProgress>;
  checkProcessStatus(lessonID: number, studentID: number): Promise<LearningProgress | null>;
  getAllLessonsInProgress(enrollmentID: number): Promise<LearningProgress[]>;
  
  // Enrollment methods
  createEnrollment(data: CreateEnrollmentDTO): Promise<Enrollment>;
  updateEnrollmentStatus(data: UpdateEnrollmentStatusDTO): Promise<Enrollment>;
  deleteEnrollment(enrollmentID: number): Promise<boolean>;
  getAllEnrollmentsByStudent(studentID: number): Promise<Enrollment[]>;
  checkEnrollment(studentID: number, courseID: number): Promise<boolean>;
  completeCourseProgress(enrollmentID: number): Promise<boolean>;
}

// Service implementation
class LearningService implements ILearningService {
  // Learning Progress methods
  async startLearningProgress(data: StartLearningProgressDTO): Promise<LearningProgress> {
    const { lessonID, studentID } = data;
    
    // Check if progress already exists
    const existingProgress = await this.checkProcessStatus(lessonID, studentID);
    if (existingProgress) {
      // If progress exists but is not started, update it to in-process
      if (existingProgress.isNotStarted()) {
        return await this.updateLearningProgress({
          studentID,
          lessonID,
          processStatus: 'InProcess'
        });
      }
      return existingProgress;
    }
    
    // Create new progress
    const result = await LearningRepository.startLearningProgress(lessonID, studentID);
    
    if (!result || result.length === 0) {
      throw new Error('Failed to start learning progress');
    }
    
    // Create domain entity
    const progress = LearningFactory.createLearningProgressFromDB(result[0]);
    
    // Emit domain event
    eventEmitter.emit('learning.progress.created', new LearningProgressCreatedEvent(progress.progressID));
    
    return progress;
  }

  async updateLearningProgress(data: UpdateLearningProgressDTO): Promise<LearningProgress> {
    const { studentID, lessonID, processStatus } = data;
    
    // Update in database
    const result = await LearningRepository.updateLearningProgress(studentID, lessonID, processStatus);
    
    if (!result || result.length === 0) {
      throw new Error('Failed to update learning progress');
    }
    
    // Create domain entity
    const progress = LearningFactory.createLearningProgressFromDB(result[0]);
    
    // Emit domain event
    eventEmitter.emit('learning.progress.updated', new LearningProgressUpdatedEvent(progress.progressID));
    
    // If progress is completed, emit completed event
    if (progress.isCompleted()) {
      eventEmitter.emit('learning.progress.completed', new LearningProgressCompletedEvent(progress.progressID));
    }
    
    return progress;
  }

  async checkProcessStatus(lessonID: number, studentID: number): Promise<LearningProgress | null> {
    const result = await LearningRepository.checkProcessStatus(lessonID, studentID);
    
    if (!result || result.length === 0) {
      return null;
    }
    
    return LearningFactory.createLearningProgressFromDB(result[0]);
  }

  async getAllLessonsInProgress(enrollmentID: number): Promise<LearningProgress[]> {
    const results = await LearningRepository.getAllLessonInProgress(enrollmentID);
    
    if (!results || results.length === 0) {
      return [];
    }
    
    // Calculate completion percentage
    const totalLessons = results.length;
    const completedLessons = results.filter(lesson => lesson.ProcessStatus === 'Done').length;
    const percentageComplete = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    
    // Add percentage to each progress
    const progressList = results.map(result => {
      return LearningFactory.createLearningProgressFromDB({
        ...result,
        PercentageComplete: percentageComplete
      });
    });
    
    return progressList;
  }
  
  // Enrollment methods
  async createEnrollment(data: CreateEnrollmentDTO): Promise<Enrollment> {
    const { studentID, courseID } = data;
    
    // Check if enrollment already exists
    const isEnrolled = await this.checkEnrollment(studentID, courseID);
    if (isEnrolled) {
      throw new Error('Student is already enrolled in this course');
    }
    
    // Create enrollment
    const result = await LearningRepository.createEnrollment(studentID, courseID);
    
    if (!result || result.length === 0) {
      throw new Error('Failed to create enrollment');
    }
    
    return LearningFactory.createEnrollmentFromDB(result[0]);
  }

  async updateEnrollmentStatus(data: UpdateEnrollmentStatusDTO): Promise<Enrollment> {
    const { enrollmentID, status } = data;
    
    // Update enrollment
    const result = await LearningRepository.updateEnrollment(enrollmentID, status);
    
    if (!result || result.length === 0) {
      throw new Error('Failed to update enrollment status');
    }
    
    return LearningFactory.createEnrollmentFromDB(result[0]);
  }

  async deleteEnrollment(enrollmentID: number): Promise<boolean> {
    const result = await LearningRepository.deleteEnrollment(enrollmentID);
    return result && result.length > 0;
  }

  async getAllEnrollmentsByStudent(studentID: number): Promise<Enrollment[]> {
    const results = await LearningRepository.getAllCourseProgress(studentID);
    
    if (!results || results.length === 0) {
      return [];
    }
    
    return results.map(result => LearningFactory.createEnrollmentFromDB(result));
  }

  async checkEnrollment(studentID: number, courseID: number): Promise<boolean> {
    return await LearningRepository.checkEnrollment(studentID, courseID);
  }

  async completeCourseProgress(enrollmentID: number): Promise<boolean> {
    const result = await LearningRepository.updateCourceProgress(enrollmentID);
    return result && result.length > 0;
  }
}

// Export a singleton instance
export default new LearningService();
