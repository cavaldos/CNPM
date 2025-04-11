/**
 * Course Repository
 * 
 * This file defines the repository interface and implementation for the Course domain.
 */

import DataConnect from '../../../../config/DataConnect';
import { Course } from '../../domain/course';

// Repository interface
export interface ICourseRepository {
  create(title: string, topic: string, description: string, image: string, instructorID: number): Promise<any>;
  update(courseID: number, title: string, topic: string, description: string, image: string, price: number): Promise<any>;
  delete(courseID: number): Promise<any>;
  getById(courseID: number): Promise<Course | null>;
  getAll(): Promise<Course[]>;
  getAllByInstructorID(instructorID: number): Promise<Course[]>;
  getAllPagination(offSet: number, pageSize: number): Promise<{ courses: Course[], total: number }>;
  search(searchTerm: string, page: number, pageSize: number): Promise<{ courses: Course[], total: number }>;
  setHidden(courseID: number, isHidden: boolean): Promise<any>;
  totalPages(isHidden: boolean): Promise<number>;
}

// Repository implementation
class CourseRepository implements ICourseRepository {
  async create(title: string, topic: string, description: string, image: string, instructorID: number): Promise<any> {
    const proc = 'create_course';
    const params = {
      Title: title,
      Topic: topic,
      Description: description,
      Image: image,
      InstructorID: instructorID,
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async update(courseID: number, title: string, topic: string, description: string, image: string, price: number): Promise<any> {
    const proc = 'update_course';
    const params = {
      CourseID: courseID,
      Title: title,
      Topic: topic,
      Description: description,
      Image: image,
      Price: price
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async delete(courseID: number): Promise<any> {
    const proc = 'delete_course';
    const params = {
      CourseID: courseID
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async getById(courseID: number): Promise<Course | null> {
    const query = `
      SELECT c.*, 
             u.FullName as InstructorName,
             (SELECT COUNT(*) FROM Review r WHERE r.CourseID = c.CourseID) as ReviewCount,
             (SELECT COUNT(*) FROM Lessons l WHERE l.CourseID = c.CourseID) as LessonCount
      FROM Course c
      INNER JOIN [User] u ON c.InstructorID = u.UserID
      WHERE c.CourseID = @CourseID
    `;
    const params = {
      CourseID: courseID
    };
    const result = await DataConnect.executeWithParams(query, params);
    return result && result.length > 0 ? Course.create(result[0]) : null;
  }

  async getAll(): Promise<Course[]> {
    const query = `
      SELECT c.*, 
             u.FullName as InstructorName,
             (SELECT COUNT(*) FROM Review r WHERE r.CourseID = c.CourseID) as ReviewCount,
             (SELECT COUNT(*) FROM Lessons l WHERE l.CourseID = c.CourseID) as LessonCount
      FROM Course c
      INNER JOIN [User] u ON c.InstructorID = u.UserID
      ORDER BY c.CreateTime DESC
    `;
    const result = await DataConnect.execute(query);
    return result ? result.map((courseData: any) => Course.create(courseData)) : [];
  }

  async getAllByInstructorID(instructorID: number): Promise<Course[]> {
    const query = `
      SELECT c.*, 
             u.FullName as InstructorName,
             (SELECT COUNT(*) FROM Review r WHERE r.CourseID = c.CourseID) as ReviewCount,
             (SELECT COUNT(*) FROM Lessons l WHERE l.CourseID = c.CourseID) as LessonCount
      FROM Course c
      INNER JOIN [User] u ON c.InstructorID = u.UserID
      WHERE c.InstructorID = @InstructorID
      ORDER BY c.CreateTime DESC
    `;
    const params = {
      InstructorID: instructorID
    };
    const result = await DataConnect.executeWithParams(query, params);
    return result ? result.map((courseData: any) => Course.create(courseData)) : [];
  }

  async getAllPagination(offSet: number, pageSize: number): Promise<{ courses: Course[], total: number }> {
    const proc = 'get_all_course';
    const params = {
      OffSet: offSet,
      PageSize: pageSize
    };
    const coursesData = await DataConnect.executeProcedure(proc, params);
    const total = await this.totalPages(false);

    const courses = coursesData ? coursesData.map((courseData: any) => Course.create(courseData)) : [];

    return {
      courses,
      total,
    };
  }

  async search(searchTerm: string, page: number, pageSize: number): Promise<{ courses: Course[], total: number }> {
    const proc = 'search_course';
    const offset = (page - 1) * pageSize;

    const params = {
      SearchTerm: searchTerm,
      Offset: offset,
      PageSize: pageSize
    };

    const total = await this.totalPages(false);

    try {
      const result = await DataConnect.executeProcedure(proc, params);

      if (!result) {
        return { courses: [], total: 0 };
      }

      const courses = result.map((courseData: any) => Course.create(courseData));

      return { courses, total };
    } catch (error) {
      console.error('Error in searchCourse repository:', error);
      throw error;
    }
  }

  async setHidden(courseID: number, isHidden: boolean): Promise<any> {
    const proc = 'set_course_hidden';
    const params = {
      CourseID: courseID,
      IsHidden: isHidden
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async totalPages(isHidden: boolean): Promise<number> {
    const query = `SELECT COUNT(*) as total FROM Course WHERE IsHidden = ${isHidden ? 1 : 0}`;
    const result = await DataConnect.execute(query);
    return result && result.length > 0 ? result[0].total : 0;
  }
}

// Export a singleton instance
export default new CourseRepository();
