/**
 * Course Factory
 * 
 * This file defines the factory for creating Course entities.
 * It centralizes the creation logic and ensures that all Course entities
 * are created with valid state.
 */

import { Course, CourseTitle, CourseDescription, CoursePrice } from '../course';

/**
 * Course Factory Interface
 * 
 * Defines the contract for creating Course entities.
 */
export interface ICourseFactory {
  /**
   * Create a new course entity
   */
  createNewCourse(
    title: string,
    topic: string,
    description: string,
    image: string,
    instructorID: number
  ): Course;

  /**
   * Create a course entity from database data
   */
  createCourseFromDB(data: any): Course;

  /**
   * Create a premium course with price
   */
  createPremiumCourse(
    title: string,
    topic: string,
    description: string,
    image: string,
    instructorID: number,
    price: number
  ): Course;

  /**
   * Create a free course
   */
  createFreeCourse(
    title: string,
    topic: string,
    description: string,
    image: string,
    instructorID: number
  ): Course;
}

/**
 * Course Factory Implementation
 * 
 * Implements the ICourseFactory interface to create Course entities.
 */
export class CourseFactory implements ICourseFactory {
  /**
   * Create a new course entity with validation
   */
  createNewCourse(
    title: string,
    topic: string,
    description: string,
    image: string,
    instructorID: number
  ): Course {
    // Validate using value objects
    const courseTitle = new CourseTitle(title);
    const courseDescription = new CourseDescription(description);
    
    if (!topic || topic.trim().length === 0) {
      throw new Error('Topic cannot be empty');
    }
    
    if (!image) {
      throw new Error('Image URL cannot be empty');
    }
    
    if (!instructorID || instructorID <= 0) {
      throw new Error('Instructor ID is required and must be positive');
    }
    
    // For new courses, we use a temporary ID that will be replaced by the database
    return new Course(
      0, // Temporary ID
      courseTitle.getValue(),
      topic.trim(),
      courseDescription.getValue(),
      image,
      0, // Default price
      instructorID,
      new Date(),
      true // Hidden by default until published
    );
  }

  /**
   * Create a course entity from database data
   */
  createCourseFromDB(data: any): Course {
    if (!data) {
      throw new Error('Data is required to create a course from database');
    }
    
    return new Course(
      data.CourseID || data.courseID,
      data.Title || data.title,
      data.Topic || data.topic,
      data.Description || data.description,
      data.Image || data.image,
      data.Price || data.price || 0,
      data.InstructorID || data.instructorID,
      data.CreateTime || data.createTime || new Date(),
      data.IsHidden || data.isHidden || false,
      data.UpdateTime || data.updateTime,
      data.InstructorName || data.instructorName,
      data.ReviewCount || data.reviewCount,
      data.LessonCount || data.lessonCount,
      data.AverageRating || data.averageRating
    );
  }

  /**
   * Create a premium course with price
   */
  createPremiumCourse(
    title: string,
    topic: string,
    description: string,
    image: string,
    instructorID: number,
    price: number
  ): Course {
    // Validate price
    const coursePrice = new CoursePrice(price);
    if (coursePrice.isFree()) {
      throw new Error('Premium course must have a price greater than 0');
    }
    
    // Create base course
    const course = this.createNewCourse(title, topic, description, image, instructorID);
    
    // Set price
    course.updatePrice(price);
    
    return course;
  }

  /**
   * Create a free course
   */
  createFreeCourse(
    title: string,
    topic: string,
    description: string,
    image: string,
    instructorID: number
  ): Course {
    // Create base course with price 0
    const course = this.createNewCourse(title, topic, description, image, instructorID);
    
    // Ensure price is 0
    course.updatePrice(0);
    
    return course;
  }
}

// Export a singleton instance
export default new CourseFactory();
