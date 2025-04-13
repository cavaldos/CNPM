/**
 * Enrollment Controller
 * 
 * This file defines the controller for the Enrollment domain.
 * It handles HTTP requests and delegates to the service layer.
 */

import { Request, Response } from 'express';
import EnrollmentService from '../domain/enrollment.service';
import _ from 'lodash';

/**
 * Enrollment Controller
 * 
 * This class is responsible for handling HTTP requests related to the Enrollment domain.
 * It delegates business logic to the service layer.
 */
class EnrollmentController {
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
      
      const result = await EnrollmentService.createEnrollment({
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
      
      const result = await EnrollmentService.updateEnrollmentStatus({
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
      
      const result = await EnrollmentService.deleteEnrollment(enrollmentID);
      
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
      
      const enrollments = await EnrollmentService.getAllEnrollmentsByStudent(studentID);
      
      if (!enrollments || enrollments.length === 0) {
        res.status(200).json({
          success: true,
          message: 'No enrollments found for this student',
          data: {
            Enrolled: [],
            Completed: [],
            Dropped: []
          }
        });
        return;
      }
      
      // Group enrollments by status
      const enrollmentDTOs = enrollments.map(enrollment => enrollment.toDTO());
      const groupedEnrollments = _.groupBy(enrollmentDTOs, 'enrollmentStatus');
      
      const result = {
        Enrolled: groupedEnrollments['Enrolled'] || [],
        Completed: groupedEnrollments['Completed'] || [],
        Dropped: groupedEnrollments['Dropped'] || []
      };
      
      res.status(200).json({
        success: true,
        message: 'Enrollments retrieved successfully',
        data: result
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
      
      const isEnrolled = await EnrollmentService.checkEnrollment(studentID, courseID);
      
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
   * Get contacts (enrolled students) for a course
   */
  async getContacts(req: Request, res: Response): Promise<void> {
    try {
      const { courseID } = req.body;
      
      if (!courseID) {
        res.status(400).json({
          success: false,
          message: 'CourseID is required'
        });
        return;
      }
      
      const contacts = await EnrollmentService.getContacts(courseID);
      
      res.status(200).json({
        success: true,
        message: 'Contacts retrieved successfully',
        data: contacts
      });
    } catch (error: any) {
      console.error('Error retrieving contacts:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to retrieve contacts'
      });
    }
  }

  /**
   * Complete an enrollment
   */
  async completeEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const { enrollmentID } = req.body;
      
      if (!enrollmentID) {
        res.status(400).json({
          success: false,
          message: 'EnrollmentID is required'
        });
        return;
      }
      
      const result = await EnrollmentService.completeEnrollment(enrollmentID);
      
      res.status(200).json({
        success: true,
        message: 'Enrollment completed successfully',
        data: result.toDTO()
      });
    } catch (error: any) {
      console.error('Error completing enrollment:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to complete enrollment'
      });
    }
  }
}

// Export a singleton instance
export default new EnrollmentController();
