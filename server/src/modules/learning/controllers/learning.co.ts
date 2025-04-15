/**
 * Learning Controller
 * 
 * This file defines the controller for the Learning domain.
 * It handles HTTP requests and delegates to the service layer.
 */

import { Request, Response } from 'express';
import LearningService from '../domain/learning.service';

/**
 * Learning Controller
 * 
 * This class is responsible for handling HTTP requests related to the Learning domain.
 * It delegates business logic to the service layer.
 */
class LearningController {
  /**
   * Start learning progress for a lesson
   */
  async startLearningProgress(req: Request, res: Response): Promise<void> {
    try {
      const { lessonID, studentID } = req.body;
      
      if (!lessonID || !studentID) {
        res.status(400).json({
          success: false,
          message: 'LessonID and StudentID are required'
        });
        return;
      }
      
      const result = await LearningService.startLearningProgress({
        lessonID,
        studentID
      });
      
      res.status(201).json({
        success: true,
        message: 'Learning progress started successfully',
        data: result.toDTO()
      });
    } catch (error: any) {
      console.error('Error starting learning progress:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to start learning progress'
      });
    }
  }

  /**
   * Update learning progress for a lesson
   */
  async updateLearningProgress(req: Request, res: Response): Promise<void> {
    try {
      const { studentID, lessonID, processStatus } = req.body;
      
      if (!studentID || !lessonID || !processStatus) {
        res.status(400).json({
          success: false,
          message: 'StudentID, LessonID, and ProcessStatus are required'
        });
        return;
      }
      
      // Validate processStatus
      const validStatuses = ['NotStarted', 'InProcess', 'Done'];
      if (!validStatuses.includes(processStatus)) {
        res.status(400).json({
          success: false,
          message: `Invalid processStatus. Must be one of: ${validStatuses.join(', ')}`
        });
        return;
      }
      
      const result = await LearningService.updateLearningProgress({
        studentID,
        lessonID,
        processStatus
      });
      
      res.status(200).json({
        success: true,
        message: 'Learning progress updated successfully',
        data: result.toDTO()
      });
    } catch (error: any) {
      console.error('Error updating learning progress:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update learning progress'
      });
    }
  }

  /**
   * Check process status for a lesson
   */
  async checkProcessStatus(req: Request, res: Response): Promise<void> {
    try {
      const { studentID, lessonID } = req.body;
      
      if (!studentID || !lessonID) {
        res.status(400).json({
          success: false,
          message: 'StudentID and LessonID are required'
        });
        return;
      }
      
      const result = await LearningService.checkProcessStatus(lessonID, studentID);
      
      if (!result) {
        res.status(200).json({
          success: true,
          message: 'No learning progress found',
          data: null
        });
        return;
      }
      
      res.status(200).json({
        success: true,
        message: 'Learning progress retrieved successfully',
        data: result.toDTO()
      });
    } catch (error: any) {
      console.error('Error checking process status:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to check process status'
      });
    }
  }

  /**
   * Get all lessons in progress for an enrollment
   */
  async getAllLessonsInProgress(req: Request, res: Response): Promise<void> {
    try {
      const { enrollmentID } = req.body;
      
      if (!enrollmentID) {
        res.status(400).json({
          success: false,
          message: 'EnrollmentID is required'
        });
        return;
      }
      
      const results = await LearningService.getAllLessonsInProgress(enrollmentID);
      
      // Calculate completion percentage
      const totalLessons = results.length;
      const completedLessons = results.filter(progress => progress.isCompleted()).length;
      const percentageComplete = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      
      res.status(200).json({
        success: true,
        message: 'Lessons in progress retrieved successfully',
        data: results.map(result => result.toDTO()),
        completionPercentage: percentageComplete
      });
    } catch (error: any) {
      console.error('Error retrieving lessons in progress:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to retrieve lessons in progress'
      });
    }
  }

  /**
   * Create a new enrollment
   */
  async createEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const { studentID, courseID } = req.body;
      
      if (!studentID || !courseID) {
        res.status(400).json({
          success: false,
          message: 'StudentID and CourseID are required'
        });
        return;
      }
      
      const result = await LearningService.createEnrollment({
        studentID,
        courseID
      });
      
      res.status(201).json({
        success: true,
        message: 'Enrollment created successfully',
        data: result.toDTO()
      });
    } catch (error: any) {
      console.error('Error creating enrollment:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create enrollment'
      });
    }
  }

  /**
   * Update enrollment status
   */
  async updateEnrollmentStatus(req: Request, res: Response): Promise<void> {
    try {
      const { enrollmentID, status } = req.body;
      
      if (!enrollmentID || !status) {
        res.status(400).json({
          success: false,
          message: 'EnrollmentID and Status are required'
        });
        return;
      }
      
      // Validate status
      const validStatuses = ['Enrolled', 'Completed', 'Dropped'];
      if (!validStatuses.includes(status)) {
        res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
        return;
      }
      
      const result = await LearningService.updateEnrollmentStatus({
        enrollmentID,
        status
      });
      
      res.status(200).json({
        success: true,
        message: 'Enrollment status updated successfully',
        data: result.toDTO()
      });
    } catch (error: any) {
      console.error('Error updating enrollment status:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update enrollment status'
      });
    }
  }

  /**
   * Delete an enrollment
   */
  async deleteEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const { enrollmentID } = req.body;
      
      if (!enrollmentID) {
        res.status(400).json({
          success: false,
          message: 'EnrollmentID is required'
        });
        return;
      }
      
      const result = await LearningService.deleteEnrollment(enrollmentID);
      
      res.status(200).json({
        success: true,
        message: 'Enrollment deleted successfully',
        data: { deleted: result }
      });
    } catch (error: any) {
      console.error('Error deleting enrollment:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete enrollment'
      });
    }
  }

  /**
   * Get all enrollments for a student
   */
  async getAllEnrollmentsByStudent(req: Request, res: Response): Promise<void> {
    try {
      const { studentID } = req.body;
      
      if (!studentID) {
        res.status(400).json({
          success: false,
          message: 'StudentID is required'
        });
        return;
      }
      
      const results = await LearningService.getAllEnrollmentsByStudent(studentID);
      
      res.status(200).json({
        success: true,
        message: 'Enrollments retrieved successfully',
        data: results.map(result => result.toDTO())
      });
    } catch (error: any) {
      console.error('Error retrieving enrollments:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to retrieve enrollments'
      });
    }
  }

  /**
   * Check if a student is enrolled in a course
   */
  async checkEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const { studentID, courseID } = req.body;
      
      if (!studentID || !courseID) {
        res.status(400).json({
          success: false,
          message: 'StudentID and CourseID are required'
        });
        return;
      }
      
      const isEnrolled = await LearningService.checkEnrollment(studentID, courseID);
      
      res.status(200).json({
        success: true,
        message: 'Enrollment status checked successfully',
        isEnrolled
      });
    } catch (error: any) {
      console.error('Error checking enrollment:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to check enrollment'
      });
    }
  }

  /**
   * Complete course progress
   */
  async completeCourseProgress(req: Request, res: Response): Promise<void> {
    try {
      const { enrollmentID } = req.body;
      
      if (!enrollmentID) {
        res.status(400).json({
          success: false,
          message: 'EnrollmentID is required'
        });
        return;
      }
      
      const result = await LearningService.completeCourseProgress(enrollmentID);
      
      res.status(200).json({
        success: true,
        message: 'Course progress completed successfully',
        data: { completed: result }
      });
    } catch (error: any) {
      console.error('Error completing course progress:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to complete course progress'
      });
    }
  }
}

// Export a singleton instance
export default new LearningController();
