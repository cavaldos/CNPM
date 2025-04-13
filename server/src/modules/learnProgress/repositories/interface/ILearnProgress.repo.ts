/**
 * LearnProgress Repository Interface
 * 
 * This file defines the repository interface for the LearnProgress domain.
 * It defines the contract that any LearnProgress repository implementation must follow.
 */

import { LearnProgress } from '../../domain/learnProgress';

/**
 * LearnProgress Repository Interface
 * 
 * This interface defines the contract for persisting and retrieving LearnProgress entities.
 * It follows the Repository pattern from Domain-Driven Design.
 */
export interface ILearnProgressRepository {
  /**
   * Start a new learning progress
   * @param lessonID Lesson ID
   * @param studentID Student ID
   * @returns The created learning progress data
   */
  startLearnProgress(lessonID: number, studentID: number): Promise<any>;

  /**
   * Update learning progress
   * @param studentID Student ID
   * @param lessonID Lesson ID
   * @param processStatus Process status (NotStarted, InProcess, Done)
   * @returns The updated learning progress data
   */
  updateLearnProgress(studentID: number, lessonID: number, processStatus: string): Promise<any>;

  /**
   * Delete learning progress
   * @param progressID Progress ID
   * @returns The result of the delete operation
   */
  deleteLearnProgress(progressID: number): Promise<any>;

  /**
   * Get all lessons in progress for an enrollment
   * @param enrollmentID Enrollment ID
   * @returns Array of lessons with progress status
   */
  getAllLessonInProgress(enrollmentID: number): Promise<any[]>;

  /**
   * Get all course progress for a student
   * @param studentID Student ID
   * @returns Array of courses with progress status
   */
  getAllCourseProgress(studentID: number): Promise<any[]>;

  /**
   * Update course progress to completed
   * @param enrollmentID Enrollment ID
   * @returns The result of the update operation
   */
  updateCourceProgress(enrollmentID: number): Promise<any>;

  /**
   * Check process status for a lesson
   * @param lessonID Lesson ID
   * @param studentID Student ID
   * @returns The learning progress data
   */
  checkProcessStatus(lessonID: number, studentID: number): Promise<any>;
}
