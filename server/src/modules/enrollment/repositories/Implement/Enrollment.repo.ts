/**
 * Enrollment Repository Implementation
 * 
 * This file implements the repository interface for the Enrollment domain.
 * It handles the persistence of Enrollment entities to the database.
 */

import DataConnect from '../../../../config/DataConnect';
import { IEnrollmentRepository } from '../interface/IEnrollment.repo';

/**
 * Enrollment Repository Implementation
 * 
 * This class is responsible for persisting and retrieving Enrollment entities from the database.
 * It implements the IEnrollmentRepository interface defined in the domain layer.
 */
class EnrollmentRepository implements IEnrollmentRepository {
  async createEnrollment(studentID: number, courseID: number): Promise<any> {
    const proc = 'create_enrollment';
    const params = {
      StudentID: studentID,
      CourseID: courseID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async deleteEnrollment(enrollmentID: number): Promise<any> {
    const proc = 'delete_enrollment';
    const params = {
      EnrollmentID: enrollmentID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async updateEnrollment(enrollmentID: number, status: string): Promise<any> {
    const proc = 'update_enrollment_status';
    const params = {
      EnrollmentID: enrollmentID,
      Status: status
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async getAllEnrollmentsByStudent(studentID: number): Promise<any[]> {
    const query = `
      SELECT e.*, c.Title as CourseName, c.Image as CourseImage, c.Topic as CourseTopic
      FROM [Enrollment] e
      INNER JOIN [Course] c ON e.CourseID = c.CourseID
      WHERE e.StudentID = ${studentID}
      ORDER BY e.EnrollDate DESC;
    `;
    return await DataConnect.execute(query);
  }

  async checkEnrollment(studentID: number, courseID: number): Promise<boolean> {
    const query = `
      SELECT COUNT(*) as count
      FROM [Enrollment]
      WHERE StudentID = ${studentID} AND CourseID = ${courseID} AND EnrollmentStatus = 'Enrolled';
    `;
    const result = await DataConnect.execute(query);
    // Check if the first element and its 'count' property exist
    if (result && result.length > 0 && result[0].count !== undefined) {
      return result[0].count > 0; // Return true if count > 0, false otherwise
    }
    return false; // Return false if result is empty or count is not found
  }

  async getContacts(courseID: number): Promise<any[]> {
    const query = `
      SELECT
        u.UserID,
        u.UserName,
        u.Email,
        u.FullName,
        e.EnrollmentStatus,
        e.EnrollDate
      FROM
        [User] u
        INNER JOIN [Enrollment] e ON u.UserID = e.StudentID
      WHERE
        e.CourseID = ${courseID}
      ORDER BY
        e.EnrollDate DESC;      
    `;
    return await DataConnect.execute(query);
  }
}

// Export a singleton instance
export default new EnrollmentRepository();
