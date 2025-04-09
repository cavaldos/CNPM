/**
 * Course Service
 * 
 * This file defines the service layer for the Course domain, containing business logic.
 */

import { Course } from '../domain/course';
import CourseRepository from '../repositories/course.repo';

// Service interface
export interface ICourseService {
  createCourse(title: string, topic: string, description: string, image: string, instructorID: number): Promise<any>;
  updateCourse(courseID: number, title: string, topic: string, description: string, image: string, price: number): Promise<any>;
  deleteCourse(courseID: number): Promise<any>;
  getCourseById(courseID: number): Promise<Course | null>;
  getAllCourses(): Promise<Course[]>;
  getAllCoursesByInstructorID(instructorID: number): Promise<Course[]>;
  getAllCoursesPagination(page: number, pageSize: number): Promise<{ courses: Course[], total: number }>;
  searchCourses(searchTerm: string, page: number, pageSize: number): Promise<{ courses: Course[], total: number }>;
  setHiddenCourse(courseID: number, isHidden: boolean): Promise<any>;
}

// Service implementation
class CourseService implements ICourseService {
  async createCourse(title: string, topic: string, description: string, image: string, instructorID: number): Promise<any> {
    // Validate input
    if (!title || !topic || !description || !instructorID) {
      throw new Error('All fields are required');
    }

    // Create course
    return await CourseRepository.create(title, topic, description, image, instructorID);
  }

  async updateCourse(courseID: number, title: string, topic: string, description: string, image: string, price: number): Promise<any> {
    // Validate input
    if (!courseID || !title || !topic || !description) {
      throw new Error('All fields are required');
    }

    // Check if course exists
    const existingCourse = await CourseRepository.getById(courseID);
    if (!existingCourse) {
      throw new Error('Course not found');
    }

    // Update course
    return await CourseRepository.update(courseID, title, topic, description, image, price);
  }

  async deleteCourse(courseID: number): Promise<any> {
    // Validate input
    if (!courseID) {
      throw new Error('Course ID is required');
    }

    // Check if course exists
    const existingCourse = await CourseRepository.getById(courseID);
    if (!existingCourse) {
      throw new Error('Course not found');
    }

    // Delete course
    return await CourseRepository.delete(courseID);
  }

  async getCourseById(courseID: number): Promise<Course | null> {
    if (!courseID) {
      throw new Error('Course ID is required');
    }
    return await CourseRepository.getById(courseID);
  }

  async getAllCourses(): Promise<Course[]> {
    return await CourseRepository.getAll();
  }

  async getAllCoursesByInstructorID(instructorID: number): Promise<Course[]> {
    if (!instructorID) {
      throw new Error('Instructor ID is required');
    }
    return await CourseRepository.getAllByInstructorID(instructorID);
  }

  async getAllCoursesPagination(page: number, pageSize: number): Promise<{ courses: Course[], total: number }> {
    if (page < 1) page = 1;
    if (pageSize < 1) pageSize = 10;

    const offset = (page - 1) * pageSize;
    return await CourseRepository.getAllPagination(offset, pageSize);
  }

  async searchCourses(searchTerm: string, page: number, pageSize: number): Promise<{ courses: Course[], total: number }> {
    if (!searchTerm) {
      throw new Error('Search term is required');
    }

    if (page < 1) page = 1;
    if (pageSize < 1) pageSize = 10;

    return await CourseRepository.search(searchTerm, page, pageSize);
  }

  async setHiddenCourse(courseID: number, isHidden: boolean): Promise<any> {
    if (!courseID) {
      throw new Error('Course ID is required');
    }

    // Check if course exists
    const existingCourse = await CourseRepository.getById(courseID);
    if (!existingCourse) {
      throw new Error('Course not found');
    }

    return await CourseRepository.setHidden(courseID, isHidden);
  }
}

// Export a singleton instance
export default new CourseService();
