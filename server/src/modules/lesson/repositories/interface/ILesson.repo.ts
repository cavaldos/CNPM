/**
 * Lesson Repository Interface
 * 
 * This file defines the repository interface for the Lesson domain.
 * It defines the contract that any Lesson repository implementation must follow.
 */

import { Lesson } from '../../domain/lesson';

/**
 * Lesson Repository Interface
 * 
 * This interface defines the contract for persisting and retrieving Lesson entities.
 * It follows the Repository pattern from Domain-Driven Design.
 */
export interface ILessonRepository {
  /**
   * Create a new video lesson
   * @param title Lesson title
   * @param duration Lesson duration in minutes
   * @param complexityLevel Lesson complexity level
   * @param lessonType Lesson type (should be 'Video')
   * @param ordinal Lesson order in the course
   * @param courseID Course ID
   * @param url Video URL
   * @returns The created lesson data
   */
  createLessonVideo(
    title: string,
    duration: number,
    complexityLevel: string,
    lessonType: string,
    ordinal: number,
    courseID: number,
    url: string
  ): Promise<any>;

  /**
   * Update a video lesson
   * @param lessonVideoID Lesson video ID
   * @param url New video URL
   * @returns The updated lesson data
   */
  updateLessonVideo(lessonVideoID: number, url: string): Promise<any>;

  /**
   * Create a new document lesson
   * @param title Lesson title
   * @param duration Lesson duration in minutes
   * @param complexityLevel Lesson complexity level
   * @param lessonType Lesson type (should be 'Document')
   * @param ordinal Lesson order in the course
   * @param documentContent Document content
   * @param courseID Course ID
   * @returns The created lesson data
   */
  createLessonDocument(
    title: string,
    duration: number,
    complexityLevel: string,
    lessonType: string,
    ordinal: number,
    documentContent: string,
    courseID: number
  ): Promise<any>;

  /**
   * Update a document lesson
   * @param lessonDocumentID Lesson document ID
   * @param documentContent New document content
   * @returns The updated lesson data
   */
  updateLessonDocument(lessonDocumentID: number, documentContent: string): Promise<any>;

  /**
   * Update a lesson
   * @param lessonID Lesson ID
   * @param title Lesson title
   * @param duration Lesson duration in minutes
   * @param complexityLevel Lesson complexity level
   * @param lessonType Lesson type
   * @param ordinal Lesson order in the course
   * @param courseID Course ID
   * @returns The updated lesson data
   */
  updateLesson(
    lessonID: number,
    title: string,
    duration: number,
    complexityLevel: string,
    lessonType: string,
    ordinal: number,
    courseID: number
  ): Promise<any>;

  /**
   * Delete a lesson
   * @param lessonID Lesson ID
   * @returns The result of the delete operation
   */
  deleteLesson(lessonID: number): Promise<any>;

  /**
   * Get all lessons for a course
   * @param courseID Course ID
   * @returns Array of lessons
   */
  getAllLessons(courseID: number): Promise<Lesson[]>;

  /**
   * Get a lesson by ID
   * @param lessonID Lesson ID
   * @returns The lesson entity or null if not found
   */
  getLessonByID(lessonID: number): Promise<Lesson | null>;

  /**
   * Sort lessons by updating their ordinal values
   * @param lessonID Lesson ID
   * @param ordinal New ordinal value
   * @returns The result of the sort operation
   */
  sortLessons(lessonID: number, ordinal: number): Promise<any>;
}
