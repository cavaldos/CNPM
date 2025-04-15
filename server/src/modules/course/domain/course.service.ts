/**
 * Course Service
 *
 * This file defines the service layer for the Course domain, containing business logic.
 */

import { Course, CourseCreatedEvent, CourseUpdatedEvent, CourseDeletedEvent } from './course';
import CourseRepository from '../repositories/Implement/Course.repo';
import CourseFactory from './factories/course.factory';
import { EventEmitter } from 'events';

// Import Lesson module
import { LessonRepository, Lesson } from '../../lesson';

// Domain event emitter
const eventEmitter = new EventEmitter();

// Course DTO interfaces
export interface CreateCourseDTO {
  title: string;
  topic: string;
  description: string;
  image: string;
  instructorID: number;
}

export interface UpdateCourseDTO {
  courseID: number;
  title: string;
  topic: string;
  description: string;
  image: string;
  price: number;
}

// Service interface
export interface ICourseService {
  createCourse(courseData: CreateCourseDTO): Promise<Course>;
  updateCourse(courseData: UpdateCourseDTO): Promise<Course>;
  deleteCourse(courseID: number): Promise<void>;
  getCourseById(courseID: number): Promise<Course | null>;
  getAllCourses(): Promise<Course[]>;
  getAllCoursesByInstructorID(instructorID: number): Promise<Course[]>;
  getAllCoursesPagination(page: number, pageSize: number): Promise<{ courses: Course[], total: number }>;
  searchCourses(searchTerm: string, page: number, pageSize: number): Promise<{ courses: Course[], total: number }>;
  publishCourse(courseID: number): Promise<Course>;
  unpublishCourse(courseID: number): Promise<Course>;
  getCourseWithLessons(courseID: number): Promise<{ course: Course, lessons: Lesson[] }>;

  // Event handlers
  onCourseCreated(listener: (event: CourseCreatedEvent) => void): void;
  onCourseUpdated(listener: (event: CourseUpdatedEvent) => void): void;
  onCourseDeleted(listener: (event: CourseDeletedEvent) => void): void;
}

// Service implementation
class CourseService implements ICourseService {
  async createCourse(courseData: CreateCourseDTO): Promise<Course> {
    const { title, topic, description, image, instructorID } = courseData;

    // Create domain entity using factory
    const course = CourseFactory.createNewCourse(title, topic, description, image, instructorID);

    // Persist to database
    const result = await CourseRepository.create(course.title, course.topic, course.description, course.image, course.instructorID);

    // Get the created course with ID from database
    const createdCourse = await CourseRepository.getById(result[0].CourseID);
    if (!createdCourse) {
      throw new Error('Failed to retrieve created course');
    }

    // Emit domain event
    eventEmitter.emit('courseCreated', new CourseCreatedEvent(createdCourse.id));

    return createdCourse;
  }

  async updateCourse(courseData: UpdateCourseDTO): Promise<Course> {
    const { courseID, title, topic, description, image, price } = courseData;

    // Get existing course
    const existingCourse = await CourseRepository.getById(courseID);
    if (!existingCourse) {
      throw new Error('Course not found');
    }

    // Update domain entity
    existingCourse.updateTitle(title);
    existingCourse.updateTopic(topic);
    existingCourse.updateDescription(description);
    existingCourse.updateImage(image);
    existingCourse.updatePrice(price);

    // Persist changes
    await CourseRepository.update(courseID, title, topic, description, image, price);

    // Get updated course
    const updatedCourse = await CourseRepository.getById(courseID);
    if (!updatedCourse) {
      throw new Error('Failed to retrieve updated course');
    }

    // Emit domain event
    eventEmitter.emit('courseUpdated', new CourseUpdatedEvent(updatedCourse.id));

    return updatedCourse;
  }

  async deleteCourse(courseID: number): Promise<void> {
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
    await CourseRepository.delete(courseID);

    // Emit domain event
    eventEmitter.emit('courseDeleted', new CourseDeletedEvent(courseID));
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

  async publishCourse(courseID: number): Promise<Course> {
    if (!courseID) {
      throw new Error('Course ID is required');
    }

    // Check if course exists
    const existingCourse = await CourseRepository.getById(courseID);
    if (!existingCourse) {
      throw new Error('Course not found');
    }

    // Update domain entity
    existingCourse.publish();

    // Persist changes
    await CourseRepository.setHidden(courseID, false);

    // Emit domain event
    eventEmitter.emit('courseUpdated', new CourseUpdatedEvent(courseID));

    return existingCourse;
  }

  async unpublishCourse(courseID: number): Promise<Course> {
    if (!courseID) {
      throw new Error('Course ID is required');
    }

    // Check if course exists
    const existingCourse = await CourseRepository.getById(courseID);
    if (!existingCourse) {
      throw new Error('Course not found');
    }

    // Update domain entity
    existingCourse.unpublish();

    // Persist changes
    await CourseRepository.setHidden(courseID, true);

    // Emit domain event
    eventEmitter.emit('courseUpdated', new CourseUpdatedEvent(courseID));

    return existingCourse;
  }

  // Event handlers
  onCourseCreated(listener: (event: CourseCreatedEvent) => void): void {
    eventEmitter.on('courseCreated', listener);
  }

  onCourseUpdated(listener: (event: CourseUpdatedEvent) => void): void {
    eventEmitter.on('courseUpdated', listener);
  }

  onCourseDeleted(listener: (event: CourseDeletedEvent) => void): void {
    eventEmitter.on('courseDeleted', listener);
  }

  /**
   * Get course details with lessons
   * This method demonstrates how to use the LessonRepository in the CourseService
   */
  async getCourseWithLessons(courseID: number): Promise<{ course: Course, lessons: Lesson[] }> {
    // Validate input
    if (!courseID) {
      throw new Error('Course ID is required');
    }

    // Get course
    const course = await this.getCourseById(courseID);
    if (!course) {
      throw new Error('Course not found');
    }

    // Get lessons for the course using LessonRepository
    const lessons = await LessonRepository.getAllLessons(courseID);

    return { course, lessons };
  }
}

// Export a singleton instance
export default new CourseService();
