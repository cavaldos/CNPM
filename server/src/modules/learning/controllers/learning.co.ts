/**
 * Learning Controller
 *
 * This file defines the controller layer for the Learning domain, handling HTTP requests.
 */

import { Request, Response } from 'express';
import LearningService from '../services/learning.service';

class LearningController {
  async startLearningProgress(req: Request, res: Response): Promise<void> {
    try {
      const { lessonID, studentID } = req.body;

      if (!lessonID || !studentID) {
        res.status(400).json({
          success: false,
          message: "Lesson ID and Student ID are required"
        });
        return;
      }

      const result = await LearningService.startLearningProgress(lessonID, studentID);

      res.status(201).json({
        success: true,
        message: "Learning progress started successfully",
        data: result
      });
    } catch (error: any) {
      console.error("Error starting learning progress:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  async updateLearningProgress(req: Request, res: Response): Promise<void> {
    try {
      const { studentID, lessonID, processStatus } = req.body;

      if (!studentID || !lessonID || !processStatus) {
        res.status(400).json({
          success: false,
          message: "Student ID, Lesson ID, and Process Status are required"
        });
        return;
      }

      const result = await LearningService.updateLearningProgress(studentID, lessonID, processStatus);

      res.status(200).json({
        success: true,
        message: "Learning progress updated successfully",
        data: result
      });
    } catch (error: any) {
      console.error("Error updating learning progress:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  async deleteLearningProgress(req: Request, res: Response): Promise<void> {
    try {
      const { progressID } = req.body;

      if (!progressID) {
        res.status(400).json({
          success: false,
          message: "Progress ID is required"
        });
        return;
      }

      const result = await LearningService.deleteLearningProgress(progressID);

      res.status(200).json({
        success: true,
        message: "Learning progress deleted successfully",
        data: result
      });
    } catch (error: any) {
      console.error("Error deleting learning progress:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  async getAllLessonsInProgress(req: Request, res: Response): Promise<void> {
    try {
      const { enrollmentID } = req.body;

      if (!enrollmentID) {
        res.status(400).json({
          success: false,
          message: "Enrollment ID is required"
        });
        return;
      }

      const { lessons, completionPercentage } = await LearningService.getAllLessonsInProgress(enrollmentID);

      res.status(200).json({
        success: true,
        message: "All lessons in progress retrieved successfully",
        completionPercentage,
        data: lessons
      });
    } catch (error: any) {
      console.error("Error getting lessons in progress:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  async getAllCourseProgress(req: Request, res: Response): Promise<void> {
    try {
      const { studentID } = req.body;

      if (!studentID) {
        res.status(400).json({
          success: false,
          message: "Student ID is required"
        });
        return;
      }

      const courseProgress = await LearningService.getAllCourseProgress(studentID);

      res.status(200).json({
        success: true,
        message: "All course progress retrieved successfully",
        data: courseProgress.map(progress => progress.toDTO())
      });
    } catch (error: any) {
      console.error("Error getting course progress:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  async completeCourseProgress(req: Request, res: Response): Promise<void> {
    try {
      const { enrollmentID } = req.body;

      if (!enrollmentID) {
        res.status(400).json({
          success: false,
          message: "Enrollment ID is required"
        });
        return;
      }

      const result = await LearningService.completeCourseProgress(enrollmentID);

      res.status(200).json({
        success: true,
        message: "Course progress completed successfully",
        data: result
      });
    } catch (error: any) {
      console.error("Error completing course progress:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  async checkLearningStatus(req: Request, res: Response): Promise<void> {
    try {
      const { lessonID, studentID } = req.body;

      if (!lessonID || !studentID) {
        res.status(400).json({
          success: false,
          message: "Lesson ID and Student ID are required"
        });
        return;
      }

      const status = await LearningService.checkLearningStatus(lessonID, studentID);

      res.status(200).json({
        success: true,
        message: "Learning status retrieved successfully",
        data: status ? status.toDTO() : null
      });
    } catch (error: any) {
      console.error("Error checking learning status:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  // Aggregate methods
  async startLessonWithAggregate(req: Request, res: Response): Promise<void> {
    try {
      const { studentID, courseID, lessonID } = req.body;

      if (!studentID || !courseID || !lessonID) {
        res.status(400).json({
          success: false,
          message: "Student ID, Course ID, and Lesson ID are required"
        });
        return;
      }

      const result = await LearningService.startLessonWithAggregate(studentID, courseID, lessonID);

      res.status(200).json({
        success: true,
        message: "Lesson started successfully using aggregate",
        data: result
      });
    } catch (error: any) {
      console.error("Error starting lesson with aggregate:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  async completeLessonWithAggregate(req: Request, res: Response): Promise<void> {
    try {
      const { studentID, courseID, lessonID } = req.body;

      if (!studentID || !courseID || !lessonID) {
        res.status(400).json({
          success: false,
          message: "Student ID, Course ID, and Lesson ID are required"
        });
        return;
      }

      const result = await LearningService.completeLessonWithAggregate(studentID, courseID, lessonID);

      res.status(200).json({
        success: true,
        message: "Lesson completed successfully using aggregate",
        data: result
      });
    } catch (error: any) {
      console.error("Error completing lesson with aggregate:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }

  async getLearningAggregate(req: Request, res: Response): Promise<void> {
    try {
      const { studentID, courseID } = req.body;

      if (!studentID || !courseID) {
        res.status(400).json({
          success: false,
          message: "Student ID and Course ID are required"
        });
        return;
      }

      const aggregate = await LearningService.getLearningAggregate(studentID, courseID);

      if (!aggregate) {
        res.status(404).json({
          success: false,
          message: "Learning aggregate not found"
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Learning aggregate retrieved successfully",
        data: {
          student: aggregate.student.toDTO(),
          course: aggregate.course.toDTO(),
          enrollment: aggregate.enrollment.toDTO(),
          courseProgress: aggregate.courseProgress.toDTO(),
          completionPercentage: aggregate.getCompletionPercentage(),
          isCourseCompleted: aggregate.isCourseCompleted(),
          lessons: aggregate.lessons.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            lessonType: lesson.lessonType,
            ordinal: lesson.ordinal,
            status: aggregate.learningProgress.find(p => p.lessonID === lesson.id)?.status || 'NotStarted'
          }))
        }
      });
    } catch (error: any) {
      console.error("Error getting learning aggregate:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal server error"
      });
    }
  }
}

// Export a singleton instance
export default new LearningController();
