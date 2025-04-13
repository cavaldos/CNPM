/**
 * Enrollment Repository Interface
 * 
 * This file defines the repository interface for the Enrollment domain.
 * It defines the contract that any Enrollment repository implementation must follow.
 */

import { Enrollment } from '../../domain/enrollment';

/**
 * Enrollment Repository Interface
 * 
 * This interface defines the contract for persisting and retrieving Enrollment entities.
 * It follows the Repository pattern from Domain-Driven Design.
 */
export interface IEnrollmentRepository {
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
   * Get all enrollments for a student
   * @param studentID Student ID
   * @returns Array of enrollments
   */
  getAllEnrollmentsByStudent(studentID: number): Promise<any[]>;

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
