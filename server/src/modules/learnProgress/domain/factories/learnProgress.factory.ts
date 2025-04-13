/**
 * LearnProgress Factory
 * 
 * This file defines the factory for creating LearnProgress domain entities.
 */

import { LearnProgress, ProcessStatus } from '../learnProgress';

// Factory interface
export interface ILearnProgressFactory {
  createLearnProgress(
    progressID: number,
    studentID: number,
    lessonID: number,
    processStatus: string,
    startTime: Date,
    completionTime?: Date,
    studentName?: string,
    lessonName?: string,
    courseName?: string,
    percentageComplete?: number,
    lessonType?: string,
    lessonOrdinal?: number,
    lessonDuration?: number
  ): LearnProgress;

  createLearnProgressFromDB(dbRecord: any): LearnProgress;
}

/**
 * LearnProgress Factory Implementation
 * 
 * Implements the ILearnProgressFactory interface to create LearnProgress entities.
 */
class LearnProgressFactory implements ILearnProgressFactory {
  /**
   * Create a new learning progress entity with validation
   */
  createLearnProgress(
    progressID: number,
    studentID: number,
    lessonID: number,
    processStatus: string,
    startTime: Date,
    completionTime?: Date,
    studentName?: string,
    lessonName?: string,
    courseName?: string,
    percentageComplete?: number,
    lessonType?: string,
    lessonOrdinal?: number,
    lessonDuration?: number
  ): LearnProgress {
    // Validate using value objects
    const status = new ProcessStatus(processStatus);
    
    return new LearnProgress(
      progressID,
      studentID,
      lessonID,
      status.getValue(),
      startTime,
      completionTime,
      studentName,
      lessonName,
      courseName,
      percentageComplete,
      lessonType,
      lessonOrdinal,
      lessonDuration
    );
  }

  /**
   * Create a learning progress entity from database record
   */
  createLearnProgressFromDB(dbRecord: any): LearnProgress {
    if (!dbRecord) {
      throw new Error('Cannot create learning progress from null database record');
    }

    // Map database fields to entity properties
    return this.createLearnProgress(
      dbRecord.ProgressID,
      dbRecord.StudentID,
      dbRecord.LessonID,
      dbRecord.ProcessStatus || 'NotStarted',
      dbRecord.StartTime ? new Date(dbRecord.StartTime) : new Date(),
      dbRecord.CompletionTime ? new Date(dbRecord.CompletionTime) : undefined,
      dbRecord.StudentName,
      dbRecord.LessonTitle || dbRecord.Title,
      dbRecord.CourseName,
      dbRecord.PercentageComplete,
      dbRecord.LessonType,
      dbRecord.Ordinal,
      dbRecord.Duration
    );
  }
}

// Export a singleton instance
export default new LearnProgressFactory();
