/**
 * Enrollment Factory
 * 
 * This file defines the factory for creating Enrollment domain entities.
 */

import { Enrollment, EnrollmentStatus } from '../enrollment';

// Factory interface
export interface IEnrollmentFactory {
  createEnrollment(
    enrollmentID: number,
    studentID: number,
    courseID: number,
    enrollmentStatus: string,
    enrollDate: Date,
    completionDate?: Date,
    studentName?: string,
    courseName?: string,
    courseImage?: string,
    courseTopic?: string
  ): Enrollment;

  createEnrollmentFromDB(dbRecord: any): Enrollment;
}

/**
 * Enrollment Factory Implementation
 * 
 * Implements the IEnrollmentFactory interface to create Enrollment entities.
 */
class EnrollmentFactory implements IEnrollmentFactory {
  /**
   * Create a new enrollment entity with validation
   */
  createEnrollment(
    enrollmentID: number,
    studentID: number,
    courseID: number,
    enrollmentStatus: string,
    enrollDate: Date,
    completionDate?: Date,
    studentName?: string,
    courseName?: string,
    courseImage?: string,
    courseTopic?: string
  ): Enrollment {
    // Validate using value objects
    const status = new EnrollmentStatus(enrollmentStatus);
    
    return new Enrollment(
      enrollmentID,
      studentID,
      courseID,
      status.getValue(),
      enrollDate,
      completionDate,
      studentName,
      courseName,
      courseImage,
      courseTopic
    );
  }

  /**
   * Create an enrollment entity from database record
   */
  createEnrollmentFromDB(dbRecord: any): Enrollment {
    if (!dbRecord) {
      throw new Error('Cannot create enrollment from null database record');
    }

    // Map database fields to entity properties
    return this.createEnrollment(
      dbRecord.EnrollmentID,
      dbRecord.StudentID,
      dbRecord.CourseID,
      dbRecord.EnrollmentStatus,
      dbRecord.EnrollDate ? new Date(dbRecord.EnrollDate) : new Date(),
      dbRecord.CompletionDate ? new Date(dbRecord.CompletionDate) : undefined,
      dbRecord.StudentName,
      dbRecord.CourseName || dbRecord.CourseTitle,
      dbRecord.CourseImage,
      dbRecord.CourseTopic || dbRecord.Topic
    );
  }
}

// Export a singleton instance
export default new EnrollmentFactory();
