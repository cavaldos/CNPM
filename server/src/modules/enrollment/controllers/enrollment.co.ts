/**
 * Enrollment Controller
 * 
 * This file defines the controller layer for the Enrollment domain, handling HTTP requests.
 */

import { Request, Response } from 'express';
import EnrollmentService from '../services/enrollment.service';

class EnrollmentController {
  async createEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const { studentID, courseID } = req.body;

      if (!studentID || !courseID) {
        res.status(400).json({ 
          success: false,
          message: "StudentID and CourseID are required" 
        });
        return;
      }

      console.log("Creating enrollment with StudentID:", studentID, "and CourseID:", courseID);
      const result = await EnrollmentService.createEnrollment(studentID, courseID);

      res.status(201).json({
        success: true,
        message: "Enrollment created successfully",
        data: result
      });
    } catch (error: any) {
      console.error("Error creating enrollment:", error);
      res.status(500).json({ 
        success: false,
        message: error.message || "Internal server error" 
      });
    }
  }

  async deleteEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const { enrollmentID } = req.body;

      if (!enrollmentID) {
        res.status(400).json({ 
          success: false,
          message: "EnrollmentID is required" 
        });
        return;
      }

      await EnrollmentService.deleteEnrollment(enrollmentID);

      res.status(200).json({
        success: true,
        message: "Enrollment deleted successfully"
      });
    } catch (error: any) {
      console.error("Error deleting enrollment:", error);
      res.status(500).json({ 
        success: false,
        message: error.message || "Internal server error" 
      });
    }
  }

  async updateEnrollmentStatus(req: Request, res: Response): Promise<void> {
    try {
      const { enrollmentID, status } = req.body;

      if (!enrollmentID) {
        res.status(400).json({ 
          success: false,
          message: "EnrollmentID is required" 
        });
        return;
      }

      const result = await EnrollmentService.updateEnrollmentStatus(enrollmentID, status);

      res.status(200).json({
        success: true,
        message: "Enrollment updated successfully",
        data: result
      });
    } catch (error: any) {
      console.error("Error updating enrollment:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  async getAllEnrollmentsByStudent(req: Request, res: Response): Promise<void> {
    try {
      const { studentID } = req.body;

      if (!studentID) {
        res.status(400).json({
          success: false,
          message: "StudentID is required"
        });
        return;
      }

      const enrollments = await EnrollmentService.getAllEnrollmentsByStudent(studentID);
      console.log("Enrollments retrieved:", enrollments);

      // Convert enrollments to DTOs
      const result = {
        Enrolled: enrollments.Enrolled.map(e => e.toDTO()),
        Completed: enrollments.Completed.map(e => e.toDTO()),
        Dropped: enrollments.Dropped.map(e => e.toDTO())
      };

      res.status(200).json({
        success: true,
        message: "Enrollments retrieved successfully",
        data: result
      });
    } catch (error: any) {
      console.error("Error retrieving enrollments:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  async getContacts(req: Request, res: Response): Promise<void> {
    try {
      const { courseID } = req.body;

      if (!courseID) {
        res.status(400).json({
          success: false,
          message: "CourseID is required"
        });
        return;
      }

      const contacts = await EnrollmentService.getContacts(courseID);
      console.log("Contacts retrieved:", contacts);

      res.status(200).json({
        success: true,
        message: "Contacts retrieved successfully",
        data: contacts
      });
    } catch (error: any) {
      console.error("Error retrieving contacts:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  async checkEnrollment(req: Request, res: Response): Promise<void> {
    try {
      const { studentID, courseID } = req.body;

      if (!studentID || !courseID) {
        res.status(400).json({
          success: false,
          message: "StudentID and CourseID are required"
        });
        return;
      }

      const isEnrolled = await EnrollmentService.checkEnrollment(studentID, courseID);

      res.status(200).json({
        success: true,
        message: "Enrollment check completed",
        data: { isEnrolled }
      });
    } catch (error: any) {
      console.error("Error checking enrollment:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }
}

// Export a singleton instance
export default new EnrollmentController();
