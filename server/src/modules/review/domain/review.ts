/**
 * Review Domain Entity
 * 
 * This file defines the Review entity and related value objects in the domain model.
 */

// Review entity
export class Review {
  private _id: number;
  private _comment: string;
  private _rating: number;
  private _studentID: number;
  private _courseID: number;
  private _createdDate: Date;
  private _updatedDate?: Date;
  private _studentName?: string;
  private _courseName?: string;

  constructor(
    id: number,
    comment: string,
    rating: number,
    studentID: number,
    courseID: number,
    createdDate: Date,
    updatedDate?: Date,
    studentName?: string,
    courseName?: string
  ) {
    this._id = id;
    this._comment = comment;
    this._rating = rating;
    this._studentID = studentID;
    this._courseID = courseID;
    this._createdDate = createdDate;
    this._updatedDate = updatedDate;
    this._studentName = studentName;
    this._courseName = courseName;

    // Domain validation
    this.validateRating(rating);
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get comment(): string {
    return this._comment;
  }

  get rating(): number {
    return this._rating;
  }

  get studentID(): number {
    return this._studentID;
  }

  get courseID(): number {
    return this._courseID;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  get updatedDate(): Date | undefined {
    return this._updatedDate;
  }

  get studentName(): string | undefined {
    return this._studentName;
  }

  get courseName(): string | undefined {
    return this._courseName;
  }

  // Domain methods
  private validateRating(rating: number): void {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }
  }

  // Factory method to create a Review from raw data
  static create(data: any): Review {
    return new Review(
      data.ReviewID || data.reviewID,
      data.Comment || data.comment,
      data.Rating || data.rating,
      data.StudentID || data.studentID,
      data.CourseID || data.courseID,
      data.CreatedDate || data.createdDate || new Date(),
      data.UpdatedDate || data.updatedDate,
      data.StudentName || data.studentName,
      data.CourseName || data.courseName
    );
  }

  // Convert to DTO for API responses
  toDTO(): any {
    return {
      reviewID: this._id,
      comment: this._comment,
      rating: this._rating,
      studentID: this._studentID,
      courseID: this._courseID,
      createdDate: this._createdDate,
      updatedDate: this._updatedDate,
      studentName: this._studentName,
      courseName: this._courseName
    };
  }
}
