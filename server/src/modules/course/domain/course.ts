/**
 * Course Domain Entity
 * 
 * This file defines the Course entity and related value objects in the domain model.
 */

// Course entity
export class Course {
  private _id: number;
  private _title: string;
  private _topic: string;
  private _description: string;
  private _image: string;
  private _price: number;
  private _instructorID: number;
  private _createTime: Date;
  private _updateTime?: Date;
  private _instructorName?: string;
  private _reviewCount?: number;
  private _lessonCount?: number;
  private _averageRating?: number;
  private _isHidden: boolean;

  constructor(
    id: number,
    title: string,
    topic: string,
    description: string,
    image: string,
    price: number,
    instructorID: number,
    createTime: Date,
    isHidden: boolean = false,
    updateTime?: Date,
    instructorName?: string,
    reviewCount?: number,
    lessonCount?: number,
    averageRating?: number
  ) {
    this._id = id;
    this._title = title;
    this._topic = topic;
    this._description = description;
    this._image = image;
    this._price = price;
    this._instructorID = instructorID;
    this._createTime = createTime;
    this._updateTime = updateTime;
    this._instructorName = instructorName;
    this._reviewCount = reviewCount;
    this._lessonCount = lessonCount;
    this._averageRating = averageRating;
    this._isHidden = isHidden;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get topic(): string {
    return this._topic;
  }

  get description(): string {
    return this._description;
  }

  get image(): string {
    return this._image;
  }

  get price(): number {
    return this._price;
  }

  get instructorID(): number {
    return this._instructorID;
  }

  get createTime(): Date {
    return this._createTime;
  }

  get updateTime(): Date | undefined {
    return this._updateTime;
  }

  get instructorName(): string | undefined {
    return this._instructorName;
  }

  get reviewCount(): number | undefined {
    return this._reviewCount;
  }

  get lessonCount(): number | undefined {
    return this._lessonCount;
  }

  get averageRating(): number | undefined {
    return this._averageRating;
  }

  get isHidden(): boolean {
    return this._isHidden;
  }

  // Domain methods
  isPublished(): boolean {
    return !this._isHidden;
  }

  hasLessons(): boolean {
    return this._lessonCount !== undefined && this._lessonCount > 0;
  }

  hasReviews(): boolean {
    return this._reviewCount !== undefined && this._reviewCount > 0;
  }

  // Factory method to create a Course from raw data
  static create(data: any): Course {
    return new Course(
      data.CourseID || data.courseID,
      data.Title || data.title,
      data.Topic || data.topic,
      data.Description || data.description,
      data.Image || data.image,
      data.Price || data.price || 0,
      data.InstructorID || data.instructorID,
      data.CreateTime || data.createTime || new Date(),
      data.IsHidden || data.isHidden || false,
      data.UpdateTime || data.updateTime,
      data.InstructorName || data.instructorName,
      data.ReviewCount || data.reviewCount,
      data.LessonCount || data.lessonCount,
      data.AverageRating || data.averageRating
    );
  }

  // Convert to DTO for API responses
  toDTO(): any {
    return {
      courseID: this._id,
      title: this._title,
      topic: this._topic,
      description: this._description,
      image: this._image,
      price: this._price,
      instructorID: this._instructorID,
      createTime: this._createTime,
      updateTime: this._updateTime,
      instructorName: this._instructorName,
      reviewCount: this._reviewCount,
      lessonCount: this._lessonCount,
      averageRating: this._averageRating,
      isHidden: this._isHidden
    };
  }
}
