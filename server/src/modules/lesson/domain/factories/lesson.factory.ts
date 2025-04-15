/**
 * Lesson Factory
 * 
 * This file defines the factory for creating Lesson entities.
 * It centralizes the creation logic and ensures that all Lesson entities
 * are created with valid state.
 */

import { Lesson, LessonTitle, LessonComplexity, LessonType } from '../lesson';

/**
 * Lesson Factory Interface
 * 
 * Defines the contract for creating Lesson entities.
 */
export interface ILessonFactory {
  /**
   * Create a new video lesson entity
   */
  createVideoLesson(
    title: string,
    duration: number,
    complexityLevel: string,
    ordinal: number,
    courseID: number,
    url: string
  ): Lesson;

  /**
   * Create a new document lesson entity
   */
  createDocumentLesson(
    title: string,
    duration: number,
    complexityLevel: string,
    ordinal: number,
    courseID: number,
    content: string
  ): Lesson;

  /**
   * Create a lesson entity from database data
   */
  createLessonFromDB(data: any): Lesson;
}

/**
 * Lesson Factory Implementation
 * 
 * Implements the ILessonFactory interface to create Lesson entities.
 */
export class LessonFactory implements ILessonFactory {
  /**
   * Create a new video lesson entity with validation
   */
  createVideoLesson(
    title: string,
    duration: number,
    complexityLevel: string,
    ordinal: number,
    courseID: number,
    url: string
  ): Lesson {
    // Validate using value objects
    const lessonTitle = new LessonTitle(title);
    const lessonComplexity = new LessonComplexity(complexityLevel);
    const lessonType = new LessonType('Video');
    
    if (duration <= 0) {
      throw new Error('Duration must be greater than 0');
    }
    
    if (ordinal < 0) {
      throw new Error('Ordinal must be a non-negative number');
    }
    
    if (!url || url.trim().length === 0) {
      throw new Error('URL cannot be empty');
    }
    
    if (!courseID || courseID <= 0) {
      throw new Error('Course ID is required and must be positive');
    }
    
    // For new lessons, we use a temporary ID that will be replaced by the database
    return new Lesson(
      0, // Temporary ID
      lessonTitle.getValue(),
      duration,
      lessonComplexity.getValue(),
      lessonType.getValue(),
      ordinal,
      courseID,
      new Date(), // Creation time
      undefined, // Update time
      undefined, // Content (not applicable for video)
      url.trim() // URL
    );
  }

  /**
   * Create a new document lesson entity with validation
   */
  createDocumentLesson(
    title: string,
    duration: number,
    complexityLevel: string,
    ordinal: number,
    courseID: number,
    content: string
  ): Lesson {
    // Validate using value objects
    const lessonTitle = new LessonTitle(title);
    const lessonComplexity = new LessonComplexity(complexityLevel);
    const lessonType = new LessonType('Document');
    
    if (duration <= 0) {
      throw new Error('Duration must be greater than 0');
    }
    
    if (ordinal < 0) {
      throw new Error('Ordinal must be a non-negative number');
    }
    
    if (!content || content.trim().length === 0) {
      throw new Error('Content cannot be empty');
    }
    
    if (!courseID || courseID <= 0) {
      throw new Error('Course ID is required and must be positive');
    }
    
    // For new lessons, we use a temporary ID that will be replaced by the database
    return new Lesson(
      0, // Temporary ID
      lessonTitle.getValue(),
      duration,
      lessonComplexity.getValue(),
      lessonType.getValue(),
      ordinal,
      courseID,
      new Date(), // Creation time
      undefined, // Update time
      content.trim(), // Content
      undefined // URL (not applicable for document)
    );
  }

  /**
   * Create a lesson entity from database data
   */
  createLessonFromDB(data: any): Lesson {
    if (!data) {
      throw new Error('Data is required to create a lesson from database');
    }
    
    const lessonType = data.LessonType || 'Video';
    let content, url, resourceID;
    
    if (lessonType === 'Video') {
      url = data.URL || data.Content;
      resourceID = data.LessonVideoID || data.ResourceID;
    } else if (lessonType === 'Document') {
      content = data.Content || data.DocumentContent;
      resourceID = data.LessonDocumentID || data.ResourceID;
    }
    
    return new Lesson(
      data.LessonID,
      data.Title || data.LessonTitle,
      data.Duration,
      data.ComplexityLevel,
      lessonType,
      data.Ordinal,
      data.CourseID,
      data.CreatedTime || data.CreateTime || new Date(),
      data.UpdatedTime || data.UpdateTime,
      content,
      url,
      resourceID
    );
  }
}

// Export a singleton instance
export default new LessonFactory();
