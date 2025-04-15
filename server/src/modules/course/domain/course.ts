/**
 * Course Domain Entity
 *
 * This file defines the Course entity and related value objects in the domain model.
 */

// Value Objects
export class CourseTitle {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Course title cannot be empty');
    }

    if (value.length > 100) {
      throw new Error('Course title cannot exceed 100 characters');
    }

    this.value = value.trim();
  }

  getValue(): string {
    return this.value;
  }
}

export class CourseDescription {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Course description cannot be empty');
    }

    this.value = value.trim();
  }

  getValue(): string {
    return this.value;
  }
}

export class CoursePrice {
  private readonly value: number;

  constructor(value: number) {
    if (value < 0) {
      throw new Error('Course price cannot be negative');
    }

    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  isFree(): boolean {
    return this.value === 0;
  }
}

// Domain Events
export class CourseCreatedEvent {
  constructor(public readonly courseId: number) { }
}

export class CourseUpdatedEvent {
  constructor(public readonly courseId: number) { }
}

export class CourseDeletedEvent {
  constructor(public readonly courseId: number) { }
}

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

  publish(): void {
    this._isHidden = false;
  }

  unpublish(): void {
    this._isHidden = true;
  }

  hasLessons(): boolean {
    return this._lessonCount !== undefined && this._lessonCount > 0;
  }

  hasReviews(): boolean {
    return this._reviewCount !== undefined && this._reviewCount > 0;
  }

  updateTitle(title: string): void {
    const courseTitle = new CourseTitle(title);
    this._title = courseTitle.getValue();
    this._updateTime = new Date();
  }

  updateDescription(description: string): void {
    const courseDescription = new CourseDescription(description);
    this._description = courseDescription.getValue();
    this._updateTime = new Date();
  }

  updatePrice(price: number): void {
    const coursePrice = new CoursePrice(price);
    this._price = coursePrice.getValue();
    this._updateTime = new Date();
  }

  updateImage(image: string): void {
    if (!image) {
      throw new Error('Image URL cannot be empty');
    }
    this._image = image;
    this._updateTime = new Date();
  }

  updateTopic(topic: string): void {
    if (!topic || topic.trim().length === 0) {
      throw new Error('Topic cannot be empty');
    }
    this._topic = topic.trim();
    this._updateTime = new Date();
  }

  isOwnedBy(instructorId: number): boolean {
    return this._instructorID === instructorId;
  }

  // Note: Factory methods have been moved to CourseFactory class

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
