/**
 * Course Command Factory
 * 
 * This file defines the factory for creating Course commands.
 * It centralizes the creation of command objects for the service layer.
 */

import { CreateCourseDTO, UpdateCourseDTO } from '../course.service';

/**
 * Course Command Factory Interface
 */
export interface ICourseCommandFactory {
  createCreateCourseCommand(
    title: string,
    topic: string,
    description: string,
    image: string,
    instructorID: number
  ): CreateCourseDTO;

  createUpdateCourseCommand(
    courseID: number,
    title: string,
    topic: string,
    description: string,
    image: string,
    price: number
  ): UpdateCourseDTO;
}

/**
 * Course Command Factory Implementation
 */
export class CourseCommandFactory implements ICourseCommandFactory {
  /**
   * Create a command for creating a new course
   */
  createCreateCourseCommand(
    title: string,
    topic: string,
    description: string,
    image: string,
    instructorID: number
  ): CreateCourseDTO {
    return {
      title: title.trim(),
      topic: topic.trim(),
      description: description.trim(),
      image: image,
      instructorID: instructorID
    };
  }

  /**
   * Create a command for updating an existing course
   */
  createUpdateCourseCommand(
    courseID: number,
    title: string,
    topic: string,
    description: string,
    image: string,
    price: number
  ): UpdateCourseDTO {
    return {
      courseID,
      title: title.trim(),
      topic: topic.trim(),
      description: description.trim(),
      image: image,
      price: price
    };
  }
}

// Export a singleton instance
export default new CourseCommandFactory();
