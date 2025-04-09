/**
 * Enrollment Service
 * 
 * This file defines the service layer for the Enrollment domain, containing business logic.
 */

import { Enrollment, EnrollmentStatus } from '../domain/enrollment';
import EnrollmentRepository from '../repositories/enrollment.repo';
import _ from 'lodash';

// Service interface
export interface IEnrollmentService {
  createEnrollment(studentID: number, courseID: number): Promise<any>;
  deleteEnrollment(enrollmentID: number): Promise<any>;
  updateEnrollmentStatus(enrollmentID: number, status: string): Promise<any>;
  getAllEnrollmentsByStudent(studentID: number): Promise<{ Enrolled: Enrollment[], Completed: Enrollment[], Dropped: Enrollment[] }>;
  getContacts(courseID: number): Promise<any[]>;
  checkEnrollment(studentID: number, courseID: number): Promise<boolean>;
}

// Service implementation
class EnrollmentService implements IEnrollmentService {
  async createEnrollment(studentID: number, courseID: number): Promise<any> {
    // Validate input
    if (!studentID || !courseID) {
      throw new Error('Student ID and Course ID are required');
    }

    // Check if student is already enrolled in the course
    const isEnrolled = await EnrollmentRepository.checkEnrollment(studentID, courseID);
    if (isEnrolled) {
      throw new Error('Student is already enrolled in this course');
    }

    // Create enrollment
    return await EnrollmentRepository.create(studentID, courseID);
  }

  async deleteEnrollment(enrollmentID: number): Promise<any> {
    // Validate input
    if (!enrollmentID) {
      throw new Error('Enrollment ID is required');
    }

    // Delete enrollment
    return await EnrollmentRepository.delete(enrollmentID);
  }

  async updateEnrollmentStatus(enrollmentID: number, status: string): Promise<any> {
    // Validate input
    if (!enrollmentID) {
      throw new Error('Enrollment ID is required');
    }

    // Validate status
    const allowedStatuses = [EnrollmentStatus.ENROLLED, EnrollmentStatus.COMPLETED, EnrollmentStatus.DROPPED];
    if (!allowedStatuses.includes(status as EnrollmentStatus)) {
      throw new Error('Status must be one of: Enrolled, Completed, or Dropped');
    }

    // Update enrollment status
    return await EnrollmentRepository.update(enrollmentID, status);
  }

  async getAllEnrollmentsByStudent(studentID: number): Promise<{ Enrolled: Enrollment[], Completed: Enrollment[], Dropped: Enrollment[] }> {
    // Validate input
    if (!studentID) {
      throw new Error('Student ID is required');
    }

    // Get all enrollments by student
    const enrollments = await EnrollmentRepository.getAllByStudent(studentID);

    // Group enrollments by status
    const groupedEnrollments = _.groupBy(enrollments, enrollment => enrollment.enrollmentStatus);

    // Return grouped enrollments
    return {
      Enrolled: groupedEnrollments[EnrollmentStatus.ENROLLED] || [],
      Completed: groupedEnrollments[EnrollmentStatus.COMPLETED] || [],
      Dropped: groupedEnrollments[EnrollmentStatus.DROPPED] || []
    };
  }

  async getContacts(courseID: number): Promise<any[]> {
    // Validate input
    if (!courseID) {
      throw new Error('Course ID is required');
    }

    // Get contacts
    return await EnrollmentRepository.getContacts(courseID);
  }

  async checkEnrollment(studentID: number, courseID: number): Promise<boolean> {
    // Validate input
    if (!studentID || !courseID) {
      throw new Error('Student ID and Course ID are required');
    }

    // Check enrollment
    return await EnrollmentRepository.checkEnrollment(studentID, courseID);
  }
}

// Export a singleton instance
export default new EnrollmentService();
