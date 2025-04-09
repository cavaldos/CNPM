/**
 * Course Controller
 * 
 * This file defines the controller layer for the Course domain, handling HTTP requests.
 */

import { Request, Response } from 'express';
import CourseService from '../services/course.service';

class CourseController {
  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const { title, topic, description, image, instructorID } = req.body;
      const result = await CourseService.createCourse(title, topic, description, image, instructorID);

      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: result
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
      const { courseID, title, topic, description, image, price } = req.body;
      const result = await CourseService.updateCourse(courseID, title, topic, description, image, price);

      res.status(200).json({
        success: true,
        message: 'Course updated successfully',
        data: result
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
      const result = await CourseService.deleteCourse(courseID);

      res.status(200).json({
        success: true,
        message: 'Course deleted successfully',
        data: result
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
        data: course.toDTO()
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get course',
        error: error
      });
    }
  }

  async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const courses = await CourseService.getAllCourses();

      res.status(200).json({
        success: true,
        message: 'Courses retrieved successfully',
        data: courses.map(course => course.toDTO())
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
        data: courses.map(course => course.toDTO())
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
          courses: result.courses.map(course => course.toDTO()),
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
          courses: result.courses.map(course => course.toDTO()),
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

  async setHiddenCourse(req: Request, res: Response): Promise<void> {
    try {
      const { courseID, isHidden } = req.body;
      const result = await CourseService.setHiddenCourse(courseID, isHidden);

      res.status(200).json({
        success: true,
        message: `Course ${isHidden ? 'hidden' : 'published'} successfully`,
        data: result
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update course visibility',
        error: error
      });
    }
  }

  // Additional method for course detail with reviews and lessons
  async getCourseDetail(req: Request, res: Response): Promise<void> {
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

      // In a real DDD implementation, we would use aggregates to fetch related data
      // For now, we'll just return the course
      res.status(200).json({
        success: true,
        message: 'Course detail retrieved successfully',
        data: course.toDTO()
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
