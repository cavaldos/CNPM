/**
 * LearnProgress Controller
 * 
 * This file defines the controller for the LearnProgress domain.
 * It handles HTTP requests and delegates to the service layer.
 */

import { Request, Response } from 'express';
import LearnProgressService from '../domain/learnProgress.service';

/**
 * LearnProgress Controller
 * 
 * This class is responsible for handling HTTP requests related to the LearnProgress domain.
 * It delegates business logic to the service layer.
 */
class LearnProgressController {
  /**
   * Start learning progress for a lesson
   */
  async startLearnProgress(req: Request, res: Response): Promise<void> {
    try {
      const { lessonID, studentID } = req.body;
      
      if (!lessonID || !studentID) {
        res.status(400).json({
          success: false,
          message: 'LessonID and StudentID are required'
        });
        return;
      }
      
      const result = await LearnProgressService.startLearnProgress({
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
  async updateLearnProgress(req: Request, res: Response): Promise<void> {
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
      
      const result = await LearnProgressService.updateLearnProgress({
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
   * Delete learning progress
   */
  async deleteLearnProgress(req: Request, res: Response): Promise<void> {
    try {
      const { progressID } = req.body;
      
      if (!progressID) {
        res.status(400).json({
          success: false,
          message: 'ProgressID is required'
        });
        return;
      }
      
      const result = await LearnProgressService.deleteLearnProgress(progressID);
      
      res.status(200).json({
        success: true,
        message: 'Learning progress deleted successfully',
        data: { deleted: result }
      });
    } catch (error: any) {
      console.error('Error deleting learning progress:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete learning progress'
      });
    }
  }

  /**
   * Get all lessons in progress for an enrollment
   */
  async getAllLessonInProgress(req: Request, res: Response): Promise<void> {
    try {
      const { enrollmentID } = req.body;
      
      if (!enrollmentID) {
        res.status(400).json({
          success: false,
          message: 'EnrollmentID is required'
        });
        return;
      }
      
      const results = await LearnProgressService.getAllLessonInProgress(enrollmentID);
      
      // Calculate completion percentage
      const totalLessons = results.length;
      const completedLessons = results.filter(progress => progress.isCompleted()).length;
      const percentageComplete = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      
      res.status(200).json({
        success: true,
        message: 'Lessons in progress retrieved successfully',
        completionPercentage: percentageComplete,
        data: results.map(result => result.toDTO())
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
   * Get all course progress for a student
   */
  async getAllCourseProgress(req: Request, res: Response): Promise<void> {
    try {
      const { studentID } = req.body;
      
      if (!studentID) {
        res.status(400).json({
          success: false,
          message: 'StudentID is required'
        });
        return;
      }
      
      const results = await LearnProgressService.getAllCourseProgress(studentID);
      
      res.status(200).json({
        success: true,
        message: 'Course progress retrieved successfully',
        data: results
      });
    } catch (error: any) {
      console.error('Error retrieving course progress:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to retrieve course progress'
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
      
      const result = await LearnProgressService.completeCourseProgress(enrollmentID);
      
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

  /**
   * Check process status for a lesson
   */
  async checkProcessStatus(req: Request, res: Response): Promise<void> {
    try {
      const { lessonID, studentID } = req.body;
      
      if (!lessonID || !studentID) {
        res.status(400).json({
          success: false,
          message: 'LessonID and StudentID are required'
        });
        return;
      }
      
      const result = await LearnProgressService.checkProcessStatus(lessonID, studentID);
      
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
        message: 'Process status retrieved successfully',
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
}

// Export a singleton instance
export default new LearnProgressController();
