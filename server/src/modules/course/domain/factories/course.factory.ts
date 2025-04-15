/**
 * Course Factory
 *
 * This file defines the factory for creating Course entities, DTOs, and commands.
 * It centralizes all creation logic related to the Course domain.
 */

import { Course, CourseTitle, CourseDescription, CoursePrice } from '../course';
import { CreateCourseDTO, UpdateCourseDTO } from '../course.service';

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
 * Course DTO interfaces
 */
export interface CourseDTO {
  courseID: number;
  title: string;
  topic: string;
  description: string;
  image: string;
  price: number;
  instructorID: number;
  createTime: Date;
  updateTime?: Date;
  instructorName?: string;
  reviewCount?: number;
  lessonCount?: number;
  averageRating?: number;
  isHidden: boolean;
}

export interface CourseDetailDTO extends CourseDTO {
  lessons?: any[];
  reviews?: any[];
}

export interface CourseListItemDTO {
  courseID: number;
  title: string;
  topic: string;
  description: string;
  image: string;
  price: number;
  instructorName?: string;
  reviewCount?: number;
  lessonCount?: number;
  averageRating?: number;
}

/**
 * Course DTO Factory Interface
 */
export interface ICourseDTO_Factory {
  createCourseDTO(course: Course): CourseDTO;
  createCourseDetailDTO(course: Course, lessons?: any[], reviews?: any[]): CourseDetailDTO;
  createCourseListItemDTO(course: Course): CourseListItemDTO;
  createCourseDTOList(courses: Course[]): CourseDTO[];
  createCourseListItemDTOList(courses: Course[]): CourseListItemDTO[];
}

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
 * Combined Course Factory Implementation
 *
 * Implements all factory interfaces for the Course domain.
 */
class CourseFactory implements ICourseFactory, ICourseDTO_Factory, ICourseCommandFactory {
  // ===== Entity Factory Methods =====

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

  // ===== DTO Factory Methods =====

  /**
   * Create a CourseDTO from a Course entity
   */
  createCourseDTO(course: Course): CourseDTO {
    return {
      courseID: course.id,
      title: course.title,
      topic: course.topic,
      description: course.description,
      image: course.image,
      price: course.price,
      instructorID: course.instructorID,
      createTime: course.createTime,
      updateTime: course.updateTime,
      instructorName: course.instructorName,
      reviewCount: course.reviewCount,
      lessonCount: course.lessonCount,
      averageRating: course.averageRating,
      isHidden: course.isHidden
    };
  }

  /**
   * Create a CourseDetailDTO from a Course entity with optional lessons and reviews
   */
  createCourseDetailDTO(course: Course, lessons: any[] = [], reviews: any[] = []): CourseDetailDTO {
    return {
      ...this.createCourseDTO(course),
      lessons,
      reviews
    };
  }

  /**
   * Create a CourseListItemDTO from a Course entity
   */
  createCourseListItemDTO(course: Course): CourseListItemDTO {
    return {
      courseID: course.id,
      title: course.title,
      topic: course.topic,
      description: course.description,
      image: course.image,
      price: course.price,
      instructorName: course.instructorName,
      reviewCount: course.reviewCount,
      lessonCount: course.lessonCount,
      averageRating: course.averageRating
    };
  }

  /**
   * Create a list of CourseDTOs from a list of Course entities
   */
  createCourseDTOList(courses: Course[]): CourseDTO[] {
    return courses.map(course => this.createCourseDTO(course));
  }

  /**
   * Create a list of CourseListItemDTOs from a list of Course entities
   */
  createCourseListItemDTOList(courses: Course[]): CourseListItemDTO[] {
    return courses.map(course => this.createCourseListItemDTO(course));
  }

  // ===== Command Factory Methods =====

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
export default new CourseFactory();
