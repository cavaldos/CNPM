/**
 * Course Repository Implementation
 *
 * This file implements the repository interface for the Course domain.
 * It handles the persistence of Course entities to the database.
 */

import DataConnect from '../../../../config/DataConnect';
import { Course } from '../../domain/course';
import CourseFactory from '../../domain/factories/course.factory';
import { ICourseRepository } from '../interface/ICourse.repo';

/**
 * Course Repository Implementation
 *
 * This class is responsible for persisting and retrieving Course entities from the database.
 * It implements the ICourseRepository interface defined in the domain layer.
 */

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
             (SELECT COUNT(*) FROM Lessons l WHERE l.CourseID = c.CourseID) as LessonCount,
             (SELECT AVG(CAST(r.Rating AS FLOAT)) FROM Review r WHERE r.CourseID = c.CourseID) as AverageRating
      FROM Course c
      INNER JOIN [User] u ON c.InstructorID = u.UserID
      WHERE c.CourseID = @CourseID
    `;
    const params = {
      CourseID: courseID
    };
    const result = await DataConnect.executeWithParams(query, params);
    return result && result.length > 0 ? CourseFactory.createCourseFromDB(result[0]) : null;
  }

  async getAll(): Promise<Course[]> {
    const query = `
      SELECT c.*,
             u.FullName as InstructorName,
             (SELECT COUNT(*) FROM Review r WHERE r.CourseID = c.CourseID) as ReviewCount,
             (SELECT COUNT(*) FROM Lessons l WHERE l.CourseID = c.CourseID) as LessonCount,
             (SELECT AVG(CAST(r.Rating AS FLOAT)) FROM Review r WHERE r.CourseID = c.CourseID) as AverageRating
      FROM Course c
      INNER JOIN [User] u ON c.InstructorID = u.UserID
      WHERE c.IsHidden = 0
      ORDER BY c.CreateTime DESC
    `;
    const result = await DataConnect.execute(query);
    return result ? result.map((courseData: any) => CourseFactory.createCourseFromDB(courseData)) : [];
  }

  async getAllByInstructorID(instructorID: number): Promise<Course[]> {
    const query = `
      SELECT c.*,
             u.FullName as InstructorName,
             (SELECT COUNT(*) FROM Review r WHERE r.CourseID = c.CourseID) as ReviewCount,
             (SELECT COUNT(*) FROM Lessons l WHERE l.CourseID = c.CourseID) as LessonCount,
             (SELECT AVG(CAST(r.Rating AS FLOAT)) FROM Review r WHERE r.CourseID = c.CourseID) as AverageRating
      FROM Course c
      INNER JOIN [User] u ON c.InstructorID = u.UserID
      WHERE c.InstructorID = @InstructorID
      ORDER BY c.CreateTime DESC
    `;
    const params = {
      InstructorID: instructorID
    };
    const result = await DataConnect.executeWithParams(query, params);
    return result ? result.map((courseData: any) => CourseFactory.createCourseFromDB(courseData)) : [];
  }

  async getAllPagination(offSet: number, pageSize: number): Promise<{ courses: Course[], total: number }> {
    const proc = 'get_all_course';
    const params = {
      OffSet: offSet,
      PageSize: pageSize
    };
    const coursesData = await DataConnect.executeProcedure(proc, params);
    const total = await this.totalPages(false);

    const courses = coursesData ? coursesData.map((courseData: any) => CourseFactory.createCourseFromDB(courseData)) : [];

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

      const courses = result.map((courseData: any) => CourseFactory.createCourseFromDB(courseData));

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
