/**
 * Learning Domain Entity
 * 
 * This file defines the Learning Progress entity and related value objects in the domain model.
 */

// Learning progress status as a value object
export enum LearningStatus {
  NOT_STARTED = 'NotStarted',
  IN_PROGRESS = 'InProcess',
  COMPLETED = 'Done'
}

// Learning Progress entity
export class LearningProgress {
  private _id: number;
  private _studentID: number;
  private _lessonID: number;
  private _status: LearningStatus;
  private _startTime: Date;
  private _completionTime?: Date;
  private _studentName?: string;
  private _lessonTitle?: string;

  constructor(
    id: number,
    studentID: number,
    lessonID: number,
    status: LearningStatus,
    startTime: Date,
    completionTime?: Date,
    studentName?: string,
    lessonTitle?: string
  ) {
    this._id = id;
    this._studentID = studentID;
    this._lessonID = lessonID;
    this._status = status;
    this._startTime = startTime;
    this._completionTime = completionTime;
    this._studentName = studentName;
    this._lessonTitle = lessonTitle;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get studentID(): number {
    return this._studentID;
  }

  get lessonID(): number {
    return this._lessonID;
  }

  get status(): LearningStatus {
    return this._status;
  }

  get startTime(): Date {
    return this._startTime;
  }

  get completionTime(): Date | undefined {
    return this._completionTime;
  }

  get studentName(): string | undefined {
    return this._studentName;
  }

  get lessonTitle(): string | undefined {
    return this._lessonTitle;
  }

  // Domain methods
  isCompleted(): boolean {
    return this._status === LearningStatus.COMPLETED;
  }

  isInProgress(): boolean {
    return this._status === LearningStatus.IN_PROGRESS;
  }

  isNotStarted(): boolean {
    return this._status === LearningStatus.NOT_STARTED;
  }

  // Factory method to create a LearningProgress from raw data
  static create(data: any): LearningProgress {
    return new LearningProgress(
      data.ProgressID || data.progressID,
      data.StudentID || data.studentID,
      data.LessonID || data.lessonID,
      data.ProcessStatus || data.processStatus || LearningStatus.NOT_STARTED,
      data.StartTime || data.startTime || new Date(),
      data.CompletionTime || data.completionTime,
      data.StudentName || data.studentName,
      data.LessonTitle || data.lessonTitle
    );
  }

  // Convert to DTO for API responses
  toDTO(): any {
    return {
      progressID: this._id,
      studentID: this._studentID,
      lessonID: this._lessonID,
      processStatus: this._status,
      startTime: this._startTime,
      completionTime: this._completionTime,
      studentName: this._studentName,
      lessonTitle: this._lessonTitle
    };
  }
}

// Course Progress entity to track overall course completion
export class CourseProgress {
  private _studentID: number;
  private _courseID: number;
  private _enrollmentID: number;
  private _enrollmentStatus: string;
  private _enrollDate: Date;
  private _studentName?: string;
  private _courseTitle?: string;
  private _courseTopic?: string;
  private _completionPercentage: number;

  constructor(
    studentID: number,
    courseID: number,
    enrollmentID: number,
    enrollmentStatus: string,
    enrollDate: Date,
    completionPercentage: number = 0,
    studentName?: string,
    courseTitle?: string,
    courseTopic?: string
  ) {
    this._studentID = studentID;
    this._courseID = courseID;
    this._enrollmentID = enrollmentID;
    this._enrollmentStatus = enrollmentStatus;
    this._enrollDate = enrollDate;
    this._studentName = studentName;
    this._courseTitle = courseTitle;
    this._courseTopic = courseTopic;
    this._completionPercentage = completionPercentage;
  }

  // Getters
  get studentID(): number {
    return this._studentID;
  }

  get courseID(): number {
    return this._courseID;
  }

  get enrollmentID(): number {
    return this._enrollmentID;
  }

  get enrollmentStatus(): string {
    return this._enrollmentStatus;
  }

  get enrollDate(): Date {
    return this._enrollDate;
  }

  get studentName(): string | undefined {
    return this._studentName;
  }

  get courseTitle(): string | undefined {
    return this._courseTitle;
  }

  get courseTopic(): string | undefined {
    return this._courseTopic;
  }

  get completionPercentage(): number {
    return this._completionPercentage;
  }

  // Domain methods
  isCompleted(): boolean {
    return this._enrollmentStatus === 'Completed';
  }

  // Factory method to create a CourseProgress from raw data
  static create(data: any): CourseProgress {
    return new CourseProgress(
      data.StudentID || data.studentID,
      data.CourseID || data.courseID,
      data.EnrollmentID || data.enrollmentID,
      data.EnrollmentStatus || data.enrollmentStatus,
      data.EnrollDate || data.enrollDate || new Date(),
      data.CompletionPercentage || data.completionPercentage || 0,
      data.StudentName || data.studentName,
      data.CourseTitle || data.courseTitle,
      data.Topic || data.topic
    );
  }

  // Convert to DTO for API responses
  toDTO(): any {
    return {
      studentID: this._studentID,
      courseID: this._courseID,
      enrollmentID: this._enrollmentID,
      enrollmentStatus: this._enrollmentStatus,
      enrollDate: this._enrollDate,
      studentName: this._studentName,
      courseTitle: this._courseTitle,
      topic: this._courseTopic,
      completionPercentage: this._completionPercentage
    };
  }
}
