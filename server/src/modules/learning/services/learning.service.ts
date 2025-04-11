/**
 * Learning Service
 *
 * This file defines the service interface and implementation for the Learning domain.
 */

import { LearningProgress, LearningStatus, CourseProgress } from '../domain/learning';
import { LearningAggregate } from '../domain/learning.aggregate';
import LearningRepository from '../repositories/learning.repo';

// Import services from other modules
import UserService from '../../user/services/user.service';
import CourseService from '../../course/services/course.service';
import LessonService from '../../lesson/services/lesson.service';
import EnrollmentService from '../../enrollment/services/enrollment.service';
import EnrollmentRepository from '../../enrollment/repositories/enrollment.repo';

// Service interface
export interface ILearningService {
  startLearningProgress(lessonID: number, studentID: number): Promise<any>;
  updateLearningProgress(studentID: number, lessonID: number, status: string): Promise<any>;
  deleteLearningProgress(progressID: number): Promise<any>;
  getAllLessonsInProgress(enrollmentID: number): Promise<{ lessons: any[], completionPercentage: number }>;
  getAllCourseProgress(studentID: number): Promise<CourseProgress[]>;
  completeCourseProgress(enrollmentID: number): Promise<any>;
  checkLearningStatus(lessonID: number, studentID: number): Promise<LearningProgress | null>;

  // Aggregate methods
  getLearningAggregate(studentID: number, courseID: number): Promise<LearningAggregate | null>;
  startLessonWithAggregate(studentID: number, courseID: number, lessonID: number): Promise<any>;
  completeLessonWithAggregate(studentID: number, courseID: number, lessonID: number): Promise<any>;
}

// Service implementation
class LearningService implements ILearningService {
  async startLearningProgress(lessonID: number, studentID: number): Promise<any> {
    // Validate input
    if (!lessonID || !studentID) {
      throw new Error('Lesson ID and Student ID are required');
    }

    // Start learning progress
    return await LearningRepository.startLearningProgress(lessonID, studentID);
  }

  async updateLearningProgress(studentID: number, lessonID: number, status: string): Promise<any> {
    // Validate input
    if (!studentID || !lessonID) {
      throw new Error('Student ID and Lesson ID are required');
    }

    // Validate status
    const validStatuses = [LearningStatus.NOT_STARTED, LearningStatus.IN_PROGRESS, LearningStatus.COMPLETED];
    if (!validStatuses.includes(status as LearningStatus)) {
      throw new Error('Status must be one of: NotStarted, InProcess, or Done');
    }

    // Update learning progress
    return await LearningRepository.updateLearningProgress(studentID, lessonID, status as LearningStatus);
  }

  async deleteLearningProgress(progressID: number): Promise<any> {
    // Validate input
    if (!progressID) {
      throw new Error('Progress ID is required');
    }

    // Delete learning progress
    return await LearningRepository.deleteLearningProgress(progressID);
  }

  async getAllLessonsInProgress(enrollmentID: number): Promise<{ lessons: any[], completionPercentage: number }> {
    // Validate input
    if (!enrollmentID) {
      throw new Error('Enrollment ID is required');
    }

    // Get all lessons in progress
    return await LearningRepository.getAllLessonsInProgress(enrollmentID);
  }

  async getAllCourseProgress(studentID: number): Promise<CourseProgress[]> {
    // Validate input
    if (!studentID) {
      throw new Error('Student ID is required');
    }

    // Get all course progress
    return await LearningRepository.getAllCourseProgress(studentID);
  }

  async completeCourseProgress(enrollmentID: number): Promise<any> {
    // Validate input
    if (!enrollmentID) {
      throw new Error('Enrollment ID is required');
    }

    // Update course progress to completed
    return await LearningRepository.updateCourseProgress(enrollmentID);
  }

  async checkLearningStatus(lessonID: number, studentID: number): Promise<LearningProgress | null> {
    // Validate input
    if (!lessonID || !studentID) {
      throw new Error('Lesson ID and Student ID are required');
    }

    // Check learning status
    return await LearningRepository.checkLearningStatus(lessonID, studentID);
  }

  // Aggregate methods implementation
  async getLearningAggregate(studentID: number, courseID: number): Promise<LearningAggregate | null> {
    try {
      // Get user
      const student = await UserService.getUserById(studentID);
      if (!student) {
        throw new Error('Student not found');
      }

      // Get course
      const course = await CourseService.getCourseById(courseID);
      if (!course) {
        throw new Error('Course not found');
      }

      // Check enrollment
      const isEnrolled = await EnrollmentService.checkEnrollment(studentID, courseID);
      if (!isEnrolled) {
        throw new Error('Student is not enrolled in this course');
      }

      // Get enrollment
      const enrollments = await EnrollmentService.getAllEnrollmentsByStudent(studentID);
      const enrollment = enrollments.Enrolled.find(e => e.courseID === courseID) ||
        enrollments.Completed.find(e => e.courseID === courseID);
      if (!enrollment) {
        throw new Error('Enrollment not found');
      }

      // Get lessons
      const { lessons } = await this.getAllLessonsInProgress(enrollment.id);

      // Get learning progress for each lesson
      const learningProgressList: LearningProgress[] = [];
      for (const lesson of lessons) {
        const progress = await this.checkLearningStatus(lesson.LessonID, studentID);
        if (progress) {
          learningProgressList.push(progress);
        }
      }

      // Get course progress
      const courseProgressList = await this.getAllCourseProgress(studentID);
      const courseProgress = courseProgressList.find(cp => cp.courseID === courseID);
      if (!courseProgress) {
        throw new Error('Course progress not found');
      }

      // Create and return the aggregate
      return LearningAggregate.create(
        student,
        course,
        lessons.map(l => ({
          id: l.LessonID,
          title: l.Title,
          lessonType: l.LessonType,
          duration: l.Duration,
          ordinal: l.Ordinal,
          courseID: courseID
        })),
        enrollment,
        learningProgressList,
        courseProgress
      );
    } catch (error) {
      console.error('Error creating learning aggregate:', error);
      return null;
    }
  }

  async startLessonWithAggregate(studentID: number, courseID: number, lessonID: number): Promise<any> {
    // Get the learning aggregate
    const aggregate = await this.getLearningAggregate(studentID, courseID);
    if (!aggregate) {
      throw new Error('Failed to create learning aggregate');
    }

    // Use the aggregate to start the lesson
    const progress = aggregate.startLesson(lessonID);
    if (!progress) {
      throw new Error('Failed to start lesson');
    }

    // Persist the changes
    return await this.startLearningProgress(lessonID, studentID);
  }

  async completeLessonWithAggregate(studentID: number, courseID: number, lessonID: number): Promise<any> {
    // Get the learning aggregate
    const aggregate = await this.getLearningAggregate(studentID, courseID);
    if (!aggregate) {
      throw new Error('Failed to create learning aggregate');
    }

    // Use the aggregate to complete the lesson
    const progress = aggregate.completeLesson(lessonID);
    if (!progress) {
      throw new Error('Failed to complete lesson');
    }

    // Persist the changes
    const result = await this.updateLearningProgress(studentID, lessonID, LearningStatus.COMPLETED);

    // If the course is completed, update the enrollment status
    if (aggregate.isCourseCompleted()) {
      await this.completeCourseProgress(aggregate.enrollment.id);
    }

    return result;
  }
}

// Export a singleton instance
export default new LearningService();
