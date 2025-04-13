/**
 * Enrollment Domain Entity
 * 
 * This file defines the Enrollment entity and related value objects in the domain model.
 */

// Value Objects
export class EnrollmentStatus {
  private readonly value: string;
  private static readonly ALLOWED_VALUES = ['Enrolled', 'Completed', 'Dropped'];
  
  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Enrollment status cannot be empty');
    }
    
    const normalizedValue = value.trim();
    if (!EnrollmentStatus.ALLOWED_VALUES.includes(normalizedValue)) {
      throw new Error(`Enrollment status must be one of: ${EnrollmentStatus.ALLOWED_VALUES.join(', ')}`);
    }
    
    this.value = normalizedValue;
  }
  
  getValue(): string {
    return this.value;
  }
  
  isEnrolled(): boolean {
    return this.value === 'Enrolled';
  }
  
  isCompleted(): boolean {
    return this.value === 'Completed';
  }
  
  isDropped(): boolean {
    return this.value === 'Dropped';
  }
}

// Domain Events
export class EnrollmentCreatedEvent {
  constructor(public readonly enrollmentID: number) {}
}

export class EnrollmentUpdatedEvent {
  constructor(public readonly enrollmentID: number) {}
}

export class EnrollmentDeletedEvent {
  constructor(public readonly enrollmentID: number) {}
}

export class EnrollmentCompletedEvent {
  constructor(public readonly enrollmentID: number) {}
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
    const enrollmentStatus = new EnrollmentStatus(status);
    this._enrollmentStatus = enrollmentStatus.getValue();
    
    if (enrollmentStatus.isCompleted() && !this._completionDate) {
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
