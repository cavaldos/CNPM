/**
 * Learning Domain Entity
 * 
 * This file defines the Learning entities and related value objects in the domain model.
 */

// Value Objects
export class ProcessStatus {
  private readonly value: string;
  private static readonly ALLOWED_VALUES = ['NotStarted', 'InProcess', 'Done'];
  
  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Process status cannot be empty');
    }
    
    const normalizedValue = value.trim();
    if (!ProcessStatus.ALLOWED_VALUES.includes(normalizedValue)) {
      throw new Error(`Process status must be one of: ${ProcessStatus.ALLOWED_VALUES.join(', ')}`);
    }
    
    this.value = normalizedValue;
  }
  
  getValue(): string {
    return this.value;
  }
  
  isNotStarted(): boolean {
    return this.value === 'NotStarted';
  }
  
  isInProcess(): boolean {
    return this.value === 'InProcess';
  }
  
  isDone(): boolean {
    return this.value === 'Done';
  }
}

// Domain Events
export class LearningProgressCreatedEvent {
  constructor(public readonly progressID: number) {}
}

export class LearningProgressUpdatedEvent {
  constructor(public readonly progressID: number) {}
}

export class LearningProgressCompletedEvent {
  constructor(public readonly progressID: number) {}
}

// Learning Progress entity
export class LearningProgress {
  private _progressID: number;
  private _studentID: number;
  private _lessonID: number;
  private _processStatus: string;
  private _startTime: Date;
  private _completionTime?: Date;
  private _studentName?: string;
  private _lessonName?: string;
  private _courseName?: string;
  private _percentageComplete?: number;

  constructor(
    progressID: number,
    studentID: number,
    lessonID: number,
    processStatus: string,
    startTime: Date,
    completionTime?: Date,
    studentName?: string,
    lessonName?: string,
    courseName?: string,
    percentageComplete?: number
  ) {
    this._progressID = progressID;
    this._studentID = studentID;
    this._lessonID = lessonID;
    this._processStatus = processStatus;
    this._startTime = startTime;
    this._completionTime = completionTime;
    this._studentName = studentName;
    this._lessonName = lessonName;
    this._courseName = courseName;
    this._percentageComplete = percentageComplete;
  }

  // Getters
  get progressID(): number {
    return this._progressID;
  }

  get studentID(): number {
    return this._studentID;
  }

  get lessonID(): number {
    return this._lessonID;
  }

  get processStatus(): string {
    return this._processStatus;
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

  get lessonName(): string | undefined {
    return this._lessonName;
  }

  get courseName(): string | undefined {
    return this._courseName;
  }

  get percentageComplete(): number | undefined {
    return this._percentageComplete;
  }

  // Domain methods
  isCompleted(): boolean {
    return this._processStatus === 'Done';
  }

  isInProgress(): boolean {
    return this._processStatus === 'InProcess';
  }

  isNotStarted(): boolean {
    return this._processStatus === 'NotStarted';
  }

  startProgress(): void {
    if (this._processStatus !== 'NotStarted') {
      throw new Error('Learning progress has already been started');
    }
    
    this._processStatus = 'InProcess';
    this._startTime = new Date();
  }

  completeProgress(): void {
    if (this._processStatus === 'Done') {
      throw new Error('Learning progress is already completed');
    }
    
    this._processStatus = 'Done';
    this._completionTime = new Date();
  }

  updateStatus(status: string): void {
    const processStatus = new ProcessStatus(status);
    this._processStatus = processStatus.getValue();
    
    if (processStatus.isDone() && !this._completionTime) {
      this._completionTime = new Date();
    }
  }

  // Convert to DTO for API responses
  toDTO(): any {
    const dto: any = {
      progressID: this._progressID,
      studentID: this._studentID,
      lessonID: this._lessonID,
      processStatus: this._processStatus,
      startTime: this._startTime,
      completionTime: this._completionTime
    };

    if (this._studentName) {
      dto.studentName = this._studentName;
    }

    if (this._lessonName) {
      dto.lessonName = this._lessonName;
    }

    if (this._courseName) {
      dto.courseName = this._courseName;
    }

    if (this._percentageComplete !== undefined) {
      dto.percentageComplete = this._percentageComplete;
    }

    return dto;
  }
}

// Enrollment entity
export class Enrollment {
  private _enrollmentID: number;
  private _studentID: number;
  private _courseID: number;
  private _enrollmentStatus: string;
  private _enrollDate: Date;
  private _completionDate?: Date;
  private _studentName?: string;
  private _courseName?: string;
  private _courseImage?: string;
  private _courseTopic?: string;

  constructor(
    enrollmentID: number,
    studentID: number,
    courseID: number,
    enrollmentStatus: string,
    enrollDate: Date,
    completionDate?: Date,
    studentName?: string,
    courseName?: string,
    courseImage?: string,
    courseTopic?: string
  ) {
    this._enrollmentID = enrollmentID;
    this._studentID = studentID;
    this._courseID = courseID;
    this._enrollmentStatus = enrollmentStatus;
    this._enrollDate = enrollDate;
    this._completionDate = completionDate;
    this._studentName = studentName;
    this._courseName = courseName;
    this._courseImage = courseImage;
    this._courseTopic = courseTopic;
  }

  // Getters
  get enrollmentID(): number {
    return this._enrollmentID;
  }

  get studentID(): number {
    return this._studentID;
  }

  get courseID(): number {
    return this._courseID;
  }

  get enrollmentStatus(): string {
    return this._enrollmentStatus;
  }

  get enrollDate(): Date {
    return this._enrollDate;
  }

  get completionDate(): Date | undefined {
    return this._completionDate;
  }

  get studentName(): string | undefined {
    return this._studentName;
  }

  get courseName(): string | undefined {
    return this._courseName;
  }

  get courseImage(): string | undefined {
    return this._courseImage;
  }

  get courseTopic(): string | undefined {
    return this._courseTopic;
  }

  // Domain methods
  isCompleted(): boolean {
    return this._enrollmentStatus === 'Completed';
  }

  isEnrolled(): boolean {
    return this._enrollmentStatus === 'Enrolled';
  }

  isDropped(): boolean {
    return this._enrollmentStatus === 'Dropped';
  }

  complete(): void {
    if (this._enrollmentStatus === 'Completed') {
      throw new Error('Enrollment is already completed');
    }
    
    this._enrollmentStatus = 'Completed';
    this._completionDate = new Date();
  }

  drop(): void {
    if (this._enrollmentStatus === 'Dropped') {
      throw new Error('Enrollment is already dropped');
    }
    
    this._enrollmentStatus = 'Dropped';
  }

  updateStatus(status: string): void {
    const allowedStatuses = ['Enrolled', 'Completed', 'Dropped'];
    if (!allowedStatuses.includes(status)) {
      throw new Error(`Enrollment status must be one of: ${allowedStatuses.join(', ')}`);
    }
    
    this._enrollmentStatus = status;
    
    if (status === 'Completed' && !this._completionDate) {
      this._completionDate = new Date();
    }
  }

  // Convert to DTO for API responses
  toDTO(): any {
    const dto: any = {
      enrollmentID: this._enrollmentID,
      studentID: this._studentID,
      courseID: this._courseID,
      enrollmentStatus: this._enrollmentStatus,
      enrollDate: this._enrollDate,
      completionDate: this._completionDate
    };

    if (this._studentName) {
      dto.studentName = this._studentName;
    }

    if (this._courseName) {
      dto.courseName = this._courseName;
    }

    if (this._courseImage) {
      dto.courseImage = this._courseImage;
    }

    if (this._courseTopic) {
      dto.courseTopic = this._courseTopic;
    }

    return dto;
  }
}
