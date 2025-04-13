/**
 * Learning Factory
 * 
 * This file defines the factory for creating Learning domain entities.
 */

import { LearningProgress, ProcessStatus, Enrollment } from '../learning';

// Factory interface
export interface ILearningFactory {
  createLearningProgress(
    progressID: number,
    studentID: number,
    lessonID: number,
    processStatus: string,
    startTime: Date,
    completionTime?: Date,
    studentName?: string,
    lessonName?: string,
    courseName?: string,
    percentageComplete?: number
  ): LearningProgress;

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

  createLearningProgressFromDB(dbRecord: any): LearningProgress;
  createEnrollmentFromDB(dbRecord: any): Enrollment;
}

/**
 * Learning Factory Implementation
 * 
 * Implements the ILearningFactory interface to create Learning entities.
 */
class LearningFactory implements ILearningFactory {
  /**
   * Create a new learning progress entity with validation
   */
  createLearningProgress(
    progressID: number,
    studentID: number,
    lessonID: number,
    processStatus: string,
    startTime: Date,
    completionTime?: Date,
    studentName?: string,
    lessonName?: string,
    courseName?: string,
    percentageComplete?: number
  ): LearningProgress {
    // Validate using value objects
    const status = new ProcessStatus(processStatus);
    
    return new LearningProgress(
      progressID,
      studentID,
      lessonID,
      status.getValue(),
      startTime,
      completionTime,
      studentName,
      lessonName,
      courseName,
      percentageComplete
    );
  }

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
    // Validate enrollment status
    const allowedStatuses = ['Enrolled', 'Completed', 'Dropped'];
    if (!allowedStatuses.includes(enrollmentStatus)) {
      throw new Error(`Enrollment status must be one of: ${allowedStatuses.join(', ')}`);
    }
    
    return new Enrollment(
      enrollmentID,
      studentID,
      courseID,
      enrollmentStatus,
      enrollDate,
      completionDate,
      studentName,
      courseName,
      courseImage,
      courseTopic
    );
  }

  /**
   * Create a learning progress entity from database record
   */
  createLearningProgressFromDB(dbRecord: any): LearningProgress {
    if (!dbRecord) {
      throw new Error('Cannot create learning progress from null database record');
    }

    // Map database fields to entity properties
    return this.createLearningProgress(
      dbRecord.ProgressID,
      dbRecord.StudentID,
      dbRecord.LessonID,
      dbRecord.ProcessStatus || 'NotStarted',
      dbRecord.StartTime ? new Date(dbRecord.StartTime) : new Date(),
      dbRecord.CompletionTime ? new Date(dbRecord.CompletionTime) : undefined,
      dbRecord.StudentName,
      dbRecord.LessonTitle || dbRecord.Title,
      dbRecord.CourseName,
      dbRecord.PercentageComplete
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
export default new LearningFactory();
