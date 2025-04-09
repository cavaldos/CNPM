/**
 * Lesson Service
 * 
 * This file defines the service layer for the Lesson domain, containing business logic.
 */

import { Lesson, VideoLesson, DocumentLesson, LessonType, ComplexityLevel } from '../domain/lesson';
import LessonRepository from '../repositories/lesson.repo';

// Service interface
export interface ILessonService {
  createLessonVideo(
    title: string, 
    duration: number, 
    complexityLevel: string, 
    ordinal: number, 
    courseID: number, 
    url: string
  ): Promise<any>;
  
  updateLessonVideo(lessonVideoID: number, url: string): Promise<any>;
  
  createLessonDocument(
    title: string, 
    duration: number, 
    complexityLevel: string, 
    ordinal: number, 
    documentContent: string, 
    courseID: number
  ): Promise<any>;
  
  updateLessonDocument(lessonDocumentID: number, documentContent: string): Promise<any>;
  
  updateLesson(
    lessonID: number, 
    title: string, 
    duration: number, 
    complexityLevel: string, 
    ordinal: number, 
    courseID: number
  ): Promise<any>;
  
  deleteLesson(lessonID: number): Promise<any>;
  getAllLessons(courseID: number): Promise<Lesson[]>;
  getLessonByID(lessonID: number): Promise<Lesson | null>;
  sortLessons(lessonID: number, ordinal: number): Promise<any>;
}

// Service implementation
class LessonService implements ILessonService {
  async createLessonVideo(
    title: string, 
    duration: number, 
    complexityLevel: string, 
    ordinal: number, 
    courseID: number, 
    url: string
  ): Promise<any> {
    // Validate input
    if (!title || duration < 0 || !complexityLevel || !courseID || !url) {
      throw new Error('All fields are required and duration must be non-negative');
    }

    // Create video lesson
    return await LessonRepository.createLessonVideo(
      title, 
      duration, 
      complexityLevel, 
      LessonType.VIDEO, 
      ordinal, 
      courseID, 
      url
    );
  }

  async updateLessonVideo(lessonVideoID: number, url: string): Promise<any> {
    // Validate input
    if (!lessonVideoID || !url) {
      throw new Error('Lesson video ID and URL are required');
    }

    // Update video lesson
    return await LessonRepository.updateLessonVideo(lessonVideoID, url);
  }

  async createLessonDocument(
    title: string, 
    duration: number, 
    complexityLevel: string, 
    ordinal: number, 
    documentContent: string, 
    courseID: number
  ): Promise<any> {
    // Validate input
    if (!title || duration < 0 || !complexityLevel || !courseID || !documentContent) {
      throw new Error('All fields are required and duration must be non-negative');
    }

    // Create document lesson
    return await LessonRepository.createLessonDocument(
      title, 
      duration, 
      complexityLevel, 
      LessonType.DOCUMENT, 
      ordinal, 
      documentContent, 
      courseID
    );
  }

  async updateLessonDocument(lessonDocumentID: number, documentContent: string): Promise<any> {
    // Validate input
    if (!lessonDocumentID || !documentContent) {
      throw new Error('Lesson document ID and content are required');
    }

    // Update document lesson
    return await LessonRepository.updateLessonDocument(lessonDocumentID, documentContent);
  }

  async updateLesson(
    lessonID: number, 
    title: string, 
    duration: number, 
    complexityLevel: string, 
    ordinal: number, 
    courseID: number
  ): Promise<any> {
    // Validate input
    if (!lessonID || !title || duration < 0 || !complexityLevel || !courseID) {
      throw new Error('All fields are required and duration must be non-negative');
    }

    // Get the lesson to determine its type
    const lesson = await LessonRepository.getLessonByID(lessonID);
    if (!lesson) {
      throw new Error('Lesson not found');
    }

    // Update lesson
    return await LessonRepository.updateLesson(
      lessonID, 
      title, 
      duration, 
      complexityLevel, 
      lesson.lessonType, 
      ordinal, 
      courseID
    );
  }

  async deleteLesson(lessonID: number): Promise<any> {
    // Validate input
    if (!lessonID) {
      throw new Error('Lesson ID is required');
    }

    // Delete lesson
    return await LessonRepository.deleteLesson(lessonID);
  }

  async getAllLessons(courseID: number): Promise<Lesson[]> {
    // Validate input
    if (!courseID) {
      throw new Error('Course ID is required');
    }

    // Get all lessons
    return await LessonRepository.getAllLessons(courseID);
  }

  async getLessonByID(lessonID: number): Promise<Lesson | null> {
    // Validate input
    if (!lessonID) {
      throw new Error('Lesson ID is required');
    }

    // Get lesson by ID
    return await LessonRepository.getLessonByID(lessonID);
  }

  async sortLessons(lessonID: number, ordinal: number): Promise<any> {
    // Validate input
    if (!lessonID || ordinal < 0) {
      throw new Error('Lesson ID is required and ordinal must be non-negative');
    }

    // Sort lessons
    return await LessonRepository.sortLessons(lessonID, ordinal);
  }
}

// Export a singleton instance
export default new LessonService();
