/**
 * Course Controller
 *
 * This file defines the controller layer for the Course domain, handling HTTP requests.
 */

import { Request, Response } from 'express';
import CourseService from '../domain/course.service';
import CourseFactory from '../domain/factories/course.factory';

class CourseController {
  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const { title, topic, description, image, instructorID } = req.body;

      // Create command using factory
      const command = CourseFactory.createCreateCourseCommand(
        title,
        topic,
        description,
        image,
        instructorID
      );

      const course = await CourseService.createCourse(command);

      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: CourseFactory.createCourseDTO(course)
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create course',
        error: error
      });
    }
  }

  async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const { courseID, title, topic, description, image, price = 0 } = req.body;

      // Create command using factory
      const command = CourseFactory.createUpdateCourseCommand(
        courseID,
        title,
        topic,
        description,
        image,
        price
      );

      const course = await CourseService.updateCourse(command);

      res.status(200).json({
        success: true,
        message: 'Course updated successfully',
        data: CourseFactory.createCourseDTO(course)
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update course',
        error: error
      });
    }
  }

  async deleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const { courseID } = req.body;
      await CourseService.deleteCourse(courseID);

      res.status(200).json({
        success: true,
        message: 'Course deleted successfully'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete course',
        error: error
      });
    }
  }

  async getCourseByID(req: Request, res: Response): Promise<void> {
    try {
      const { courseID } = req.body;
      const course = await CourseService.getCourseById(courseID);

      if (!course) {
        res.status(404).json({
          success: false,
          message: 'Course not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Course retrieved successfully',
        data: CourseFactory.createCourseDTO(course)
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get course',
        error: error
      });
    }
  }

  async getAllCourses(_req: Request, res: Response): Promise<void> {
    try {
      const courses = await CourseService.getAllCourses();

      res.status(200).json({
        success: true,
        message: 'Courses retrieved successfully',
        data: CourseFactory.createCourseDTOList(courses)
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get courses',
        error: error
      });
    }
  }

  async getAllCoursesByInstructorID(req: Request, res: Response): Promise<void> {
    try {
      const { instructorID } = req.body;
      const courses = await CourseService.getAllCoursesByInstructorID(instructorID);

      res.status(200).json({
        success: true,
        message: 'Courses retrieved successfully',
        data: CourseFactory.createCourseDTOList(courses)
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get courses',
        error: error
      });
    }
  }

  async getAllCoursesPagination(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, pageSize = 10 } = req.body;
      const result = await CourseService.getAllCoursesPagination(page, pageSize);

      res.status(200).json({
        success: true,
        message: 'Courses retrieved successfully',
        data: {
          courses: CourseFactory.createCourseDTOList(result.courses),
          total: result.total
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get courses',
        error: error
      });
    }
  }

  async searchCourse(req: Request, res: Response): Promise<void> {
    try {
      const { search, page = 1, pageSize = 10 } = req.body;
      const result = await CourseService.searchCourses(search, page, pageSize);

      res.status(200).json({
        success: true,
        message: 'Courses retrieved successfully',
        data: {
          courses: CourseFactory.createCourseDTOList(result.courses),
          total: result.total
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to search courses',
        error: error
      });
    }
  }

  async publishCourse(req: Request, res: Response): Promise<void> {
    try {
      const { courseID } = req.body;
      const course = await CourseService.publishCourse(courseID);

      res.status(200).json({
        success: true,
        message: 'Course published successfully',
        data: CourseFactory.createCourseDTO(course)
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to publish course',
        error: error
      });
    }
  }

  async unpublishCourse(req: Request, res: Response): Promise<void> {
    try {
      const { courseID } = req.body;
      const course = await CourseService.unpublishCourse(courseID);

      res.status(200).json({
        success: true,
        message: 'Course unpublished successfully',
        data: CourseFactory.createCourseDTO(course)
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to unpublish course',
        error: error
      });
    }
  }

  // For backward compatibility
  async setHiddenCourse(req: Request, res: Response): Promise<void> {
    try {
      const { courseID, isHidden } = req.body;
      let course;

      if (isHidden) {
        course = await CourseService.unpublishCourse(courseID);
      } else {
        course = await CourseService.publishCourse(courseID);
      }

      res.status(200).json({
        success: true,
        message: `Course ${isHidden ? 'hidden' : 'published'} successfully`,
        data: CourseFactory.createCourseDTO(course)
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update course visibility',
        error: error
      });
    }
  }

  // Method for course detail with lessons using DDD approach
  async getCourseDetail(req: Request, res: Response): Promise<void> {
    try {
      const { courseID } = req.body;

      // Use the new method that leverages LessonRepository
      const { course, lessons } = await CourseService.getCourseWithLessons(courseID);

      // Create a detailed DTO with lessons
      const courseDTO = CourseFactory.createCourseDetailDTO(course);

      // Add lessons to the DTO
      res.status(200).json({
        success: true,
        message: 'Course detail retrieved successfully',
        data: {
          ...courseDTO,
          lessons: lessons.map(lesson => lesson.toDTO())
        }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get course detail',
        error: error
      });
    }
  }
}

// Export a singleton instance
export default new CourseController();
