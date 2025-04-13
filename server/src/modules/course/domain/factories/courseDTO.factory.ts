/**
 * Course DTO Factory
 * 
 * This file defines the factory for creating Course DTOs.
 * It centralizes the conversion logic between domain entities and DTOs.
 */

import { Course } from '../course';

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
 * Course DTO Factory Implementation
 */
export class CourseDTO_Factory implements ICourseDTO_Factory {
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
}

// Export a singleton instance
export default new CourseDTO_Factory();
