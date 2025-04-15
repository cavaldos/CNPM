/**
 * Lesson Service
 * 
 * This file defines the service layer for the Lesson domain, containing business logic.
 */

import { Lesson, LessonCreatedEvent, LessonUpdatedEvent, LessonDeletedEvent } from './lesson';
import LessonRepository from '../repositories/Implement/Lesson.repo';
import LessonFactory from './factories/lesson.factory';
import { EventEmitter } from 'events';

// Domain event emitter
const eventEmitter = new EventEmitter();

// Lesson DTO interfaces
export interface CreateVideoLessonDTO {
  title: string;
  duration: number;
  complexityLevel: string;
  ordinal: number;
  courseID: number;
  url: string;
}

export interface CreateDocumentLessonDTO {
  title: string;
  duration: number;
  complexityLevel: string;
  ordinal: number;
  courseID: number;
  documentContent: string;
}

export interface UpdateLessonDTO {
  lessonID: number;
  title: string;
  duration: number;
  complexityLevel: string;
  ordinal: number;
  courseID: number;
}

export interface UpdateVideoLessonDTO {
  lessonVideoID: number;
  url: string;
}

export interface UpdateDocumentLessonDTO {
  lessonDocumentID: number;
  documentContent: string;
}

// Service interface
export interface ILessonService {
  createVideoLesson(lessonData: CreateVideoLessonDTO): Promise<Lesson>;
  createDocumentLesson(lessonData: CreateDocumentLessonDTO): Promise<Lesson>;
  updateLesson(lessonData: UpdateLessonDTO): Promise<Lesson>;
  updateVideoLesson(lessonData: UpdateVideoLessonDTO): Promise<any>;
  updateDocumentLesson(lessonData: UpdateDocumentLessonDTO): Promise<any>;
  deleteLesson(lessonID: number): Promise<void>;
  getLessonById(lessonID: number): Promise<Lesson | null>;
  getAllLessonsByCourseId(courseID: number): Promise<Lesson[]>;
  sortLessons(lessonID: number, ordinal: number): Promise<any>;
  
  // Event handlers
  onLessonCreated(listener: (event: LessonCreatedEvent) => void): void;
  onLessonUpdated(listener: (event: LessonUpdatedEvent) => void): void;
  onLessonDeleted(listener: (event: LessonDeletedEvent) => void): void;
}

// Service implementation
class LessonService implements ILessonService {
  async createVideoLesson(lessonData: CreateVideoLessonDTO): Promise<Lesson> {
    const { title, duration, complexityLevel, ordinal, courseID, url } = lessonData;
    
    // Create domain entity using factory
    const lesson = LessonFactory.createVideoLesson(
      title,
      duration,
      complexityLevel,
      ordinal,
      courseID,
      url
    );
    
    // Persist to database
    const result = await LessonRepository.createLessonVideo(
      lesson.title,
      lesson.duration,
      lesson.complexityLevel,
      'Video',
      lesson.ordinal,
      lesson.courseID,
      url
    );
    
    // Get the created lesson with ID from database
    const createdLesson = await LessonRepository.getLessonByID(result[0].LessonID);
    if (!createdLesson) {
      throw new Error('Failed to retrieve created lesson');
    }
    
    // Emit domain event
    eventEmitter.emit('lessonCreated', new LessonCreatedEvent(createdLesson.id));
    
    return createdLesson;
  }

  async createDocumentLesson(lessonData: CreateDocumentLessonDTO): Promise<Lesson> {
    const { title, duration, complexityLevel, ordinal, courseID, documentContent } = lessonData;
    
    // Create domain entity using factory
    const lesson = LessonFactory.createDocumentLesson(
      title,
      duration,
      complexityLevel,
      ordinal,
      courseID,
      documentContent
    );
    
    // Persist to database
    const result = await LessonRepository.createLessonDocument(
      lesson.title,
      lesson.duration,
      lesson.complexityLevel,
      'Document',
      lesson.ordinal,
      documentContent,
      lesson.courseID
    );
    
    // Get the created lesson with ID from database
    const createdLesson = await LessonRepository.getLessonByID(result[0].LessonID);
    if (!createdLesson) {
      throw new Error('Failed to retrieve created lesson');
    }
    
    // Emit domain event
    eventEmitter.emit('lessonCreated', new LessonCreatedEvent(createdLesson.id));
    
    return createdLesson;
  }

  async updateLesson(lessonData: UpdateLessonDTO): Promise<Lesson> {
    const { lessonID, title, duration, complexityLevel, ordinal, courseID } = lessonData;
    
    // Get existing lesson
    const existingLesson = await LessonRepository.getLessonByID(lessonID);
    if (!existingLesson) {
      throw new Error('Lesson not found');
    }
    
    // Update domain entity
    existingLesson.updateTitle(title);
    existingLesson.updateDuration(duration);
    existingLesson.updateComplexityLevel(complexityLevel);
    existingLesson.updateOrdinal(ordinal);
    
    // Persist changes
    await LessonRepository.updateLesson(
      lessonID,
      title,
      duration,
      complexityLevel,
      existingLesson.lessonType,
      ordinal,
      courseID
    );
    
    // Get updated lesson
    const updatedLesson = await LessonRepository.getLessonByID(lessonID);
    if (!updatedLesson) {
      throw new Error('Failed to retrieve updated lesson');
    }
    
    // Emit domain event
    eventEmitter.emit('lessonUpdated', new LessonUpdatedEvent(updatedLesson.id));
    
    return updatedLesson;
  }

  async updateVideoLesson(lessonData: UpdateVideoLessonDTO): Promise<any> {
    const { lessonVideoID, url } = lessonData;
    
    // Persist changes
    const result = await LessonRepository.updateLessonVideo(lessonVideoID, url);
    
    // Emit domain event
    eventEmitter.emit('lessonUpdated', new LessonUpdatedEvent(lessonVideoID));
    
    return result;
  }

  async updateDocumentLesson(lessonData: UpdateDocumentLessonDTO): Promise<any> {
    const { lessonDocumentID, documentContent } = lessonData;
    
    // Persist changes
    const result = await LessonRepository.updateLessonDocument(lessonDocumentID, documentContent);
    
    // Emit domain event
    eventEmitter.emit('lessonUpdated', new LessonUpdatedEvent(lessonDocumentID));
    
    return result;
  }

  async deleteLesson(lessonID: number): Promise<void> {
    // Validate input
    if (!lessonID) {
      throw new Error('Lesson ID is required');
    }

    // Check if lesson exists
    const existingLesson = await LessonRepository.getLessonByID(lessonID);
    if (!existingLesson) {
      throw new Error('Lesson not found');
    }

    // Delete lesson
    await LessonRepository.deleteLesson(lessonID);
    
    // Emit domain event
    eventEmitter.emit('lessonDeleted', new LessonDeletedEvent(lessonID));
  }

  async getLessonById(lessonID: number): Promise<Lesson | null> {
    if (!lessonID) {
      throw new Error('Lesson ID is required');
    }
    return await LessonRepository.getLessonByID(lessonID);
  }

  async getAllLessonsByCourseId(courseID: number): Promise<Lesson[]> {
    if (!courseID) {
      throw new Error('Course ID is required');
    }
    return await LessonRepository.getAllLessons(courseID);
  }

  async sortLessons(lessonID: number, ordinal: number): Promise<any> {
    if (!lessonID) {
      throw new Error('Lesson ID is required');
    }
    
    if (ordinal < 0) {
      throw new Error('Ordinal must be a non-negative number');
    }
    
    return await LessonRepository.sortLessons(lessonID, ordinal);
  }

  // Event handlers
  onLessonCreated(listener: (event: LessonCreatedEvent) => void): void {
    eventEmitter.on('lessonCreated', listener);
  }
  
  onLessonUpdated(listener: (event: LessonUpdatedEvent) => void): void {
    eventEmitter.on('lessonUpdated', listener);
  }
  
  onLessonDeleted(listener: (event: LessonDeletedEvent) => void): void {
    eventEmitter.on('lessonDeleted', listener);
  }
}

// Export a singleton instance
export default new LessonService();
