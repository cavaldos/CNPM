/**
 * Learning Repository
 * 
 * This file defines the repository interface and implementation for the Learning domain.
 */

import DataConnect from '../../../config/DataConnect';
import { LearningProgress, LearningStatus, CourseProgress } from '../domain/learning';

// Repository interface
export interface ILearningRepository {
  startLearningProgress(lessonID: number, studentID: number): Promise<any>;
  updateLearningProgress(studentID: number, lessonID: number, status: LearningStatus): Promise<any>;
  deleteLearningProgress(progressID: number): Promise<any>;
  getAllLessonsInProgress(enrollmentID: number): Promise<{ lessons: any[], completionPercentage: number }>;
  getAllCourseProgress(studentID: number): Promise<CourseProgress[]>;
  updateCourseProgress(enrollmentID: number): Promise<any>;
  checkLearningStatus(lessonID: number, studentID: number): Promise<LearningProgress | null>;
}

// Repository implementation
class LearningRepository implements ILearningRepository {
  async startLearningProgress(lessonID: number, studentID: number): Promise<any> {
    const proc = 'start_learn_progress';
    const params = {
      LessonID: lessonID,
      StudentID: studentID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async updateLearningProgress(studentID: number, lessonID: number, status: LearningStatus): Promise<any> {
    const proc = 'update_learn_progress';
    const params = {
      StudentID: studentID,
      LessonID: lessonID,
      ProcessStatus: status
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async deleteLearningProgress(progressID: number): Promise<any> {
    const proc = 'delete_learn_progress';
    const params = {
      ProgressID: progressID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async getAllLessonsInProgress(enrollmentID: number): Promise<{ lessons: any[], completionPercentage: number }> {
    const query = `
      SELECT
        e.EnrollmentID,
        l.LessonID,
        l.Ordinal,
        l.LessonType,
        l.Title,
        l.Duration,
        lp.ProgressID,
        COALESCE(lp.ProcessStatus, 'NotStarted') AS ProcessStatus,
        lp.StartTime,
        lp.CompletionTime
      FROM
        Enrollment e
        INNER JOIN Course c ON e.CourseID = c.CourseID
        INNER JOIN Lessons l ON c.CourseID = l.CourseID
        LEFT JOIN LearnProgress lp ON l.LessonID = lp.LessonID
          AND lp.StudentID = e.StudentID
      WHERE
        e.EnrollmentID = @EnrollmentID
      ORDER BY
        l.Ordinal;
    `;
    
    const params = {
      EnrollmentID: enrollmentID
    };
    
    const result = await DataConnect.executeWithParams(query, params);
    
    // Calculate completion percentage
    let completionPercentage = 0;
    if (result && Array.isArray(result) && result.length > 0) {
      const totalLessons = result.length;
      const completedLessons = result.filter(lesson => lesson.ProcessStatus === "Done").length;
      completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    }
    
    return {
      lessons: result || [],
      completionPercentage
    };
  }

  async getAllCourseProgress(studentID: number): Promise<CourseProgress[]> {
    const query = `
      SELECT
        U.UserID AS StudentID,
        U.FullName AS StudentName,
        C.CourseID,
        C.Title AS CourseTitle,
        C.Topic,
        C.Price,
        E.EnrollDate,
        E.EnrollmentID,
        E.EnrollmentStatus
      FROM
        Enrollment E
      INNER JOIN
        [User] U ON E.StudentID = U.UserID
      INNER JOIN
        Course C ON E.CourseID = C.CourseID
      WHERE StudentID = @StudentID;
    `;
    
    const params = {
      StudentID: studentID
    };
    
    const result = await DataConnect.executeWithParams(query, params);
    
    // Calculate completion percentage for each course
    if (result && Array.isArray(result)) {
      for (const course of result) {
        // Get all lessons for this course
        const lessonsQuery = `
          SELECT
            l.LessonID,
            COALESCE(lp.ProcessStatus, 'NotStarted') AS ProcessStatus
          FROM
            Lessons l
            LEFT JOIN LearnProgress lp ON l.LessonID = lp.LessonID AND lp.StudentID = @StudentID
          WHERE
            l.CourseID = @CourseID;
        `;
        
        const lessonParams = {
          StudentID: studentID,
          CourseID: course.CourseID
        };
        
        const lessons = await DataConnect.executeWithParams(lessonsQuery, lessonParams);
        
        if (lessons && Array.isArray(lessons) && lessons.length > 0) {
          const totalLessons = lessons.length;
          const completedLessons = lessons.filter(lesson => lesson.ProcessStatus === "Done").length;
          course.CompletionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        } else {
          course.CompletionPercentage = 0;
        }
      }
    }
    
    return result ? result.map((data: any) => CourseProgress.create(data)) : [];
  }

  async updateCourseProgress(enrollmentID: number): Promise<any> {
    const query = `
      UPDATE Enrollment
      SET EnrollmentStatus = 'Completed'
      WHERE EnrollmentID = @EnrollmentID;
    `;
    
    const params = {
      EnrollmentID: enrollmentID
    };
    
    return await DataConnect.executeWithParams(query, params);
  }

  async checkLearningStatus(lessonID: number, studentID: number): Promise<LearningProgress | null> {
    const query = `
      SELECT
        lp.ProgressID,
        lp.StudentID,
        lp.LessonID,
        lp.ProcessStatus,
        lp.StartTime,
        lp.CompletionTime,
        l.Title AS LessonTitle,
        u.FullName AS StudentName
      FROM
        [LearnProgress] lp
        INNER JOIN [User] u ON lp.StudentID = u.UserID
        INNER JOIN [Lessons] l ON lp.LessonID = l.LessonID
      WHERE
        lp.StudentID = @StudentID
        AND lp.LessonID = @LessonID
    `;
    
    const params = {
      StudentID: studentID,
      LessonID: lessonID
    };
    
    const result = await DataConnect.executeWithParams(query, params);
    return result && result.length > 0 ? LearningProgress.create(result[0]) : null;
  }
}

// Export a singleton instance
export default new LearningRepository();
