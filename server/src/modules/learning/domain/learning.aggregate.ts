/**
 * Learning Aggregate
 * 
 * This file defines the Learning Aggregate Root that coordinates between
 * learning progress, courses, lessons, and users.
 */

import { LearningProgress, CourseProgress, LearningStatus } from './learning';
import { User } from '../../user/domain/user';
import { Course } from '../../course/domain/course';
import { Lesson } from '../../lesson/domain/lesson';
import { Enrollment, EnrollmentStatus } from '../../enrollment/domain/enrollment';

// Learning Aggregate Root
export class LearningAggregate {
  private _student: User;
  private _course: Course;
  private _lessons: Lesson[];
  private _enrollment: Enrollment;
  private _learningProgress: LearningProgress[];
  private _courseProgress: CourseProgress;

  constructor(
    student: User,
    course: Course,
    lessons: Lesson[],
    enrollment: Enrollment,
    learningProgress: LearningProgress[],
    courseProgress: CourseProgress
  ) {
    this._student = student;
    this._course = course;
    this._lessons = lessons;
    this._enrollment = enrollment;
    this._learningProgress = learningProgress;
    this._courseProgress = courseProgress;
  }

  // Getters
  get student(): User {
    return this._student;
  }

  get course(): Course {
    return this._course;
  }

  get lessons(): Lesson[] {
    return this._lessons;
  }

  get enrollment(): Enrollment {
    return this._enrollment;
  }

  get learningProgress(): LearningProgress[] {
    return this._learningProgress;
  }

  get courseProgress(): CourseProgress {
    return this._courseProgress;
  }

  // Domain methods
  
  // Start learning a lesson
  startLesson(lessonID: number): LearningProgress | null {
    // Find the lesson
    const lesson = this._lessons.find(l => l.id === lessonID);
    if (!lesson) {
      return null;
    }

    // Check if there's already progress for this lesson
    let progress = this._learningProgress.find(p => p.lessonID === lessonID);
    
    // If no progress exists, create a new one
    if (!progress) {
      progress = LearningProgress.create({
        progressID: 0, // Will be assigned by the database
        studentID: this._student.id,
        lessonID: lessonID,
        processStatus: LearningStatus.IN_PROGRESS,
        startTime: new Date(),
        studentName: this._student.fullName,
        lessonTitle: lesson.title
      });
      
      this._learningProgress.push(progress);
    } 
    // If progress exists but is not started or in progress, update it
    else if (progress.isNotStarted()) {
      // In a real implementation, we would update the progress object
      // For now, we'll just return the existing progress
    }

    return progress;
  }

  // Complete a lesson
  completeLesson(lessonID: number): LearningProgress | null {
    // Find the lesson
    const lesson = this._lessons.find(l => l.id === lessonID);
    if (!lesson) {
      return null;
    }

    // Find the progress for this lesson
    const progressIndex = this._learningProgress.findIndex(p => p.lessonID === lessonID);
    if (progressIndex === -1) {
      return null;
    }

    // In a real implementation, we would update the progress object
    // For now, we'll just return the existing progress
    const progress = this._learningProgress[progressIndex];
    
    // Calculate new completion percentage
    const totalLessons = this._lessons.length;
    const completedLessons = this._learningProgress.filter(p => p.isCompleted()).length + 1; // +1 for the current lesson
    const completionPercentage = Math.round((completedLessons / totalLessons) * 100);
    
    // Update course progress
    this._courseProgress = CourseProgress.create({
      ...this._courseProgress.toDTO(),
      completionPercentage: completionPercentage
    });

    // If all lessons are completed, mark the course as completed
    if (completedLessons === totalLessons) {
      this._courseProgress = CourseProgress.create({
        ...this._courseProgress.toDTO(),
        enrollmentStatus: EnrollmentStatus.COMPLETED
      });
    }

    return progress;
  }

  // Get overall course completion percentage
  getCompletionPercentage(): number {
    if (this._lessons.length === 0) {
      return 0;
    }

    const completedLessons = this._learningProgress.filter(p => p.isCompleted()).length;
    return Math.round((completedLessons / this._lessons.length) * 100);
  }

  // Check if the course is completed
  isCourseCompleted(): boolean {
    return this._courseProgress.isCompleted();
  }

  // Factory method to create a LearningAggregate
  static create(
    student: User,
    course: Course,
    lessons: Lesson[],
    enrollment: Enrollment,
    learningProgress: LearningProgress[],
    courseProgress: CourseProgress
  ): LearningAggregate {
    return new LearningAggregate(
      student,
      course,
      lessons,
      enrollment,
      learningProgress,
      courseProgress
    );
  }
}
