/**
 * Enrollment Service
 * 
 * This file defines the service layer for the Enrollment domain, containing business logic.
 */

import { Enrollment, EnrollmentCreatedEvent, EnrollmentUpdatedEvent, EnrollmentDeletedEvent, EnrollmentCompletedEvent } from './enrollment';
import EnrollmentRepository from '../repositories/Implement/Enrollment.repo';
import EnrollmentFactory from './factories/enrollment.factory';
import { EventEmitter } from 'events';

// Import related modules
import { Course, CourseService } from '../../course';

// Domain event emitter
const eventEmitter = new EventEmitter();

// DTO interfaces
export interface CreateEnrollmentDTO {
  studentID: number;
  courseID: number;
}

export interface UpdateEnrollmentStatusDTO {
  enrollmentID: number;
  status: string;
}

// Service interface
export interface IEnrollmentService {
  createEnrollment(data: CreateEnrollmentDTO): Promise<Enrollment>;
  updateEnrollmentStatus(data: UpdateEnrollmentStatusDTO): Promise<Enrollment>;
  deleteEnrollment(enrollmentID: number): Promise<boolean>;
  getAllEnrollmentsByStudent(studentID: number): Promise<Enrollment[]>;
  checkEnrollment(studentID: number, courseID: number): Promise<boolean>;
  getContacts(courseID: number): Promise<any[]>;
  completeEnrollment(enrollmentID: number): Promise<Enrollment>;
}

// Service implementation
class EnrollmentService implements IEnrollmentService {
  async createEnrollment(data: CreateEnrollmentDTO): Promise<Enrollment> {
    const { studentID, courseID } = data;
    
    // Check if enrollment already exists
    const isEnrolled = await this.checkEnrollment(studentID, courseID);
    if (isEnrolled) {
      throw new Error('Student is already enrolled in this course');
    }
    
    // Create enrollment
    const result = await EnrollmentRepository.createEnrollment(studentID, courseID);
    
    if (!result || result.length === 0) {
      throw new Error('Failed to create enrollment');
    }
    
    const enrollment = EnrollmentFactory.createEnrollmentFromDB(result[0]);
    
    // Emit domain event
    eventEmitter.emit('enrollment.created', new EnrollmentCreatedEvent(enrollment.enrollmentID));
    
    return enrollment;
  }

  async updateEnrollmentStatus(data: UpdateEnrollmentStatusDTO): Promise<Enrollment> {
    const { enrollmentID, status } = data;
    
    // Update enrollment
    const result = await EnrollmentRepository.updateEnrollment(enrollmentID, status);
    
    if (!result || result.length === 0) {
      throw new Error('Failed to update enrollment status');
    }
    
    const enrollment = EnrollmentFactory.createEnrollmentFromDB(result[0]);
    
    // Emit domain event
    eventEmitter.emit('enrollment.updated', new EnrollmentUpdatedEvent(enrollment.enrollmentID));
    
    // If enrollment is completed, emit completed event
    if (enrollment.isCompleted()) {
      eventEmitter.emit('enrollment.completed', new EnrollmentCompletedEvent(enrollment.enrollmentID));
    }
    
    return enrollment;
  }

  async deleteEnrollment(enrollmentID: number): Promise<boolean> {
    const result = await EnrollmentRepository.deleteEnrollment(enrollmentID);
    
    if (result && result.length > 0) {
      // Emit domain event
      eventEmitter.emit('enrollment.deleted', new EnrollmentDeletedEvent(enrollmentID));
      return true;
    }
    
    return false;
  }

  async getAllEnrollmentsByStudent(studentID: number): Promise<Enrollment[]> {
    const results = await EnrollmentRepository.getAllEnrollmentsByStudent(studentID);
    
    if (!results || results.length === 0) {
      return [];
    }
    
    // Extract enrollments from the nested array structure if needed
    let enrollments = [];
    if (Array.isArray(results) && results.length > 0) {
      // Check if the first element is also an array (nested array)
      if (Array.isArray(results[0])) {
        enrollments = results[0];
      } else {
        enrollments = results;
      }
    }
    
    return enrollments.map(result => EnrollmentFactory.createEnrollmentFromDB(result));
  }

  async checkEnrollment(studentID: number, courseID: number): Promise<boolean> {
    return await EnrollmentRepository.checkEnrollment(studentID, courseID);
  }

  async getContacts(courseID: number): Promise<any[]> {
    const results = await EnrollmentRepository.getContacts(courseID);
    
    if (!results || results.length === 0) {
      return [];
    }
    
    return results;
  }

  async completeEnrollment(enrollmentID: number): Promise<Enrollment> {
    // Update enrollment status to completed
    return await this.updateEnrollmentStatus({
      enrollmentID,
      status: 'Completed'
    });
  }
}

// Export a singleton instance
export default new EnrollmentService();
