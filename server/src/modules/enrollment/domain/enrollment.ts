/**
 * Enrollment Domain Entity
 * 
 * This file defines the Enrollment entity and related value objects in the domain model.
 */

// Enrollment status as a value object
export enum EnrollmentStatus {
  ENROLLED = 'Enrolled',
  COMPLETED = 'Completed',
  DROPPED = 'Dropped'
}

// Enrollment entity
export class Enrollment {
  private _id: number;
  private _studentID: number;
  private _courseID: number;
  private _enrollmentStatus: EnrollmentStatus;
  private _enrollDate: Date;
  private _studentName?: string;
  private _courseName?: string;
  private _courseImage?: string;
  private _courseTopic?: string;

  constructor(
    id: number,
    studentID: number,
    courseID: number,
    enrollmentStatus: EnrollmentStatus,
    enrollDate: Date,
    studentName?: string,
    courseName?: string,
    courseImage?: string,
    courseTopic?: string
  ) {
    this._id = id;
    this._studentID = studentID;
    this._courseID = courseID;
    this._enrollmentStatus = enrollmentStatus;
    this._enrollDate = enrollDate;
    this._studentName = studentName;
    this._courseName = courseName;
    this._courseImage = courseImage;
    this._courseTopic = courseTopic;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get studentID(): number {
    return this._studentID;
  }

  get courseID(): number {
    return this._courseID;
  }

  get enrollmentStatus(): EnrollmentStatus {
    return this._enrollmentStatus;
  }

  get enrollDate(): Date {
    return this._enrollDate;
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
  isActive(): boolean {
    return this._enrollmentStatus === EnrollmentStatus.ENROLLED;
  }

  isCompleted(): boolean {
    return this._enrollmentStatus === EnrollmentStatus.COMPLETED;
  }

  isDropped(): boolean {
    return this._enrollmentStatus === EnrollmentStatus.DROPPED;
  }

  // Factory method to create an Enrollment from raw data
  static create(data: any): Enrollment {
    // Map the status string to EnrollmentStatus enum
    let status: EnrollmentStatus;
    switch (data.EnrollmentStatus || data.enrollmentStatus) {
      case 'Completed':
        status = EnrollmentStatus.COMPLETED;
        break;
      case 'Dropped':
        status = EnrollmentStatus.DROPPED;
        break;
      default:
        status = EnrollmentStatus.ENROLLED;
    }

    return new Enrollment(
      data.EnrollmentID || data.enrollmentID,
      data.StudentID || data.studentID,
      data.CourseID || data.courseID,
      status,
      data.EnrollDate || data.enrollDate || new Date(),
      data.StudentName || data.studentName,
      data.CourseName || data.courseName,
      data.CourseImage || data.courseImage,
      data.CourseTopic || data.courseTopic
    );
  }

  // Convert to DTO for API responses
  toDTO(): any {
    return {
      enrollmentID: this._id,
      studentID: this._studentID,
      courseID: this._courseID,
      enrollmentStatus: this._enrollmentStatus,
      enrollDate: this._enrollDate,
      studentName: this._studentName,
      courseName: this._courseName,
      courseImage: this._courseImage,
      courseTopic: this._courseTopic
    };
  }
}
