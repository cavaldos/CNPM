/**
 * Learning Repository Interface
 * 
 * This file defines the repository interface for the Learning domain.
 * It defines the contract that any Learning repository implementation must follow.
 */

import { LearningProgress, Enrollment } from '../../domain/learning';

/**
 * Learning Repository Interface
 * 
 * This interface defines the contract for persisting and retrieving Learning entities.
 * It follows the Repository pattern from Domain-Driven Design.
 */
export interface ILearningRepository {
  /**
   * Start a new learning progress
   * @param lessonID Lesson ID
   * @param studentID Student ID
   * @returns The created learning progress data
   */
  startLearningProgress(lessonID: number, studentID: number): Promise<any>;

  /**
   * Update learning progress
   * @param studentID Student ID
   * @param lessonID Lesson ID
   * @param processStatus Process status (NotStarted, InProcess, Done)
   * @returns The updated learning progress data
   */
  updateLearningProgress(studentID: number, lessonID: number, processStatus: string): Promise<any>;

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

  /**
   * Create a new enrollment
   * @param studentID Student ID
   * @param courseID Course ID
   * @returns The created enrollment data
   */
  createEnrollment(studentID: number, courseID: number): Promise<any>;

  /**
   * Delete an enrollment
   * @param enrollmentID Enrollment ID
   * @returns The result of the delete operation
   */
  deleteEnrollment(enrollmentID: number): Promise<any>;

  /**
   * Update enrollment status
   * @param enrollmentID Enrollment ID
   * @param status Enrollment status (Enrolled, Completed, Dropped)
   * @returns The updated enrollment data
   */
  updateEnrollment(enrollmentID: number, status: string): Promise<any>;

  /**
   * Check if a student is enrolled in a course
   * @param studentID Student ID
   * @param courseID Course ID
   * @returns True if enrolled, false otherwise
   */
  checkEnrollment(studentID: number, courseID: number): Promise<boolean>;

  /**
   * Get contacts (enrolled students) for a course
   * @param courseID Course ID
   * @returns Array of enrolled students
   */
  getContacts(courseID: number): Promise<any[]>;
}
