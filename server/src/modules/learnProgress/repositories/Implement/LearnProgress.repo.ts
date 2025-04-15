/**
 * LearnProgress Repository Implementation
 * 
 * This file implements the repository interface for the LearnProgress domain.
 * It handles the persistence of LearnProgress entities to the database.
 */

import DataConnect from '../../../../config/DataConnect';
import { ILearnProgressRepository } from '../interface/ILearnProgress.repo';

/**
 * LearnProgress Repository Implementation
 * 
 * This class is responsible for persisting and retrieving LearnProgress entities from the database.
 * It implements the ILearnProgressRepository interface defined in the domain layer.
 */
class LearnProgressRepository implements ILearnProgressRepository {
  async startLearnProgress(lessonID: number, studentID: number): Promise<any> {
    const proc = 'start_learn_progress';
    const params = {
      LessonID: lessonID,
      StudentID: studentID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async updateLearnProgress(studentID: number, lessonID: number, processStatus: string): Promise<any> {
    const proc = 'update_learn_progress';
    const params = {
      StudentID: studentID,
      LessonID: lessonID,
      ProcessStatus: processStatus
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async deleteLearnProgress(progressID: number): Promise<any> {
    const proc = 'delete_learn_progress';
    const params = {
      ProgressID: progressID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async getAllLessonInProgress(enrollmentID: number): Promise<any[]> {
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
        e.EnrollmentID = ${enrollmentID}
      ORDER BY
        l.Ordinal;
    `;
    return await DataConnect.execute(query);
  }

  async getAllCourseProgress(studentID: number): Promise<any[]> {
    const query = `
      SELECT
        U.UserID AS StudentID,
        U.FullName AS StudentName,
        C.CourseID,
        C.Title AS CourseTitle,
        C.Topic,
        C.Price,
        C.Image AS CourseImage,
        E.EnrollDate,
        E.EnrollmentID,
        E.EnrollmentStatus
      FROM
        Enrollment E
      INNER JOIN
        [User] U ON E.StudentID = U.UserID
      INNER JOIN
        Course C ON E.CourseID = C.CourseID
      WHERE StudentID = ${studentID};
    `;
    return await DataConnect.execute(query);
  }

  async updateCourceProgress(enrollmentID: number): Promise<any> {
    const query = `
      UPDATE Enrollment
      SET EnrollmentStatus = 'Completed'
      WHERE EnrollmentID = ${enrollmentID};
    `;
    return await DataConnect.execute(query);
  }

  async checkProcessStatus(lessonID: number, studentID: number): Promise<any> {
    const query = `
      SELECT
        lp.ProgressID,
        lp.StudentID,
        lp.LessonID,
        lp.ProcessStatus,
        lp.StartTime,
        lp.CompletionTime,
        l.Title AS LessonTitle,
        l.LessonType,
        l.Duration,
        l.Ordinal,
        u.FullName AS StudentName
      FROM
        [LearnProgress] lp
        INNER JOIN [User] u ON lp.StudentID = u.UserID
        INNER JOIN [Lessons] l ON lp.LessonID = l.LessonID
      WHERE
        lp.StudentID = ${studentID}
        AND lp.LessonID = ${lessonID}
    `;
    return await DataConnect.execute(query);
  }
}

// Export a singleton instance
export default new LearnProgressRepository();
