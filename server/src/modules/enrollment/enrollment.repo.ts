/**
 * Enrollment Repository
 * 
 * This file defines the repository interface and implementation for the Enrollment domain.
 */

import DataConnect from '../../config/DataConnect';
import { Enrollment, EnrollmentStatus } from './enrollment';

// Repository interface
export interface IEnrollmentRepository {
  create(studentID: number, courseID: number): Promise<any>;
  delete(enrollmentID: number): Promise<any>;
  update(enrollmentID: number, status: string): Promise<any>;
  getAllByStudent(studentID: number): Promise<Enrollment[]>;
  getContacts(courseID: number): Promise<any[]>;
  checkEnrollment(studentID: number, courseID: number): Promise<boolean>;
}

// Repository implementation
class EnrollmentRepository implements IEnrollmentRepository {
  async create(studentID: number, courseID: number): Promise<any> {
    const proc = 'create_enrollment';
    const params = {
      StudentID: studentID,
      CourseID: courseID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async delete(enrollmentID: number): Promise<any> {
    const proc = 'delete_enrollment';
    const params = {
      EnrollmentID: enrollmentID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async update(enrollmentID: number, status: string): Promise<any> {
    const proc = 'update_enrollment_status';
    const params = {
      EnrollmentID: enrollmentID,
      Status: status
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async getAllByStudent(studentID: number): Promise<Enrollment[]> {
    const query = `
      SELECT e.*, c.Title as CourseName, c.Image as CourseImage, c.Topic as CourseTopic
      FROM [Enrollment] e
      INNER JOIN [Course] c ON e.CourseID = c.CourseID
      WHERE e.StudentID = ${studentID}
      ORDER BY e.EnrollDate DESC;
    `;
    
    const result = await DataConnect.execute(query);
    
    if (!result || result.length === 0) {
      return [];
    }
    
    return result.map((enrollmentData: any) => Enrollment.create(enrollmentData));
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
    
    const result = await DataConnect.execute(query);
    return result || [];
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
}

// Export a singleton instance
export default new EnrollmentRepository();
