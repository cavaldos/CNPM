/**
 * Lesson Domain Entity
 * 
 * This file defines the Lesson entity and related value objects in the domain model.
 */

// Lesson complexity level as a value object
export enum ComplexityLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

// Lesson type as a value object
export enum LessonType {
  VIDEO = 'Video',
  DOCUMENT = 'Document',
  QUIZ = 'Quiz'
}

// Base Lesson entity (abstract)
export abstract class Lesson {
  protected _id: number;
  protected _title: string;
  protected _lessonType: LessonType;
  protected _duration: number;
  protected _complexityLevel: ComplexityLevel;
  protected _ordinal: number;
  protected _courseID: number;
  protected _createdTime: Date;
  protected _updatedTime?: Date;

  constructor(
    id: number,
    title: string,
    lessonType: LessonType,
    duration: number,
    complexityLevel: ComplexityLevel,
    ordinal: number,
    courseID: number,
    createdTime: Date,
    updatedTime?: Date
  ) {
    this._id = id;
    this._title = title;
    this._lessonType = lessonType;
    this._duration = duration;
    this._complexityLevel = complexityLevel;
    this._ordinal = ordinal;
    this._courseID = courseID;
    this._createdTime = createdTime;
    this._updatedTime = updatedTime;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get lessonType(): LessonType {
    return this._lessonType;
  }

  get duration(): number {
    return this._duration;
  }

  get complexityLevel(): ComplexityLevel {
    return this._complexityLevel;
  }

  get ordinal(): number {
    return this._ordinal;
  }

  get courseID(): number {
    return this._courseID;
  }

  get createdTime(): Date {
    return this._createdTime;
  }

  get updatedTime(): Date | undefined {
    return this._updatedTime;
  }

  // Abstract methods
  abstract toDTO(): any;
}

// Video Lesson entity
export class VideoLesson extends Lesson {
  private _url: string;
  private _lessonVideoID?: number;

  constructor(
    id: number,
    title: string,
    duration: number,
    complexityLevel: ComplexityLevel,
    ordinal: number,
    courseID: number,
    url: string,
    createdTime: Date,
    updatedTime?: Date,
    lessonVideoID?: number
  ) {
    super(id, title, LessonType.VIDEO, duration, complexityLevel, ordinal, courseID, createdTime, updatedTime);
    this._url = url;
    this._lessonVideoID = lessonVideoID;
  }

  // Getters
  get url(): string {
    return this._url;
  }

  get lessonVideoID(): number | undefined {
    return this._lessonVideoID;
  }

  // Factory method to create a VideoLesson from raw data
  static create(data: any): VideoLesson {
    return new VideoLesson(
      data.LessonID || data.lessonID,
      data.Title || data.title,
      data.Duration || data.duration || 0,
      data.ComplexityLevel || data.complexityLevel || ComplexityLevel.BEGINNER,
      data.Ordinal || data.ordinal || 0,
      data.CourseID || data.courseID,
      data.URL || data.url || '',
      data.CreatedTime || data.createdTime || new Date(),
      data.UpdatedTime || data.updatedTime,
      data.LessonVideoID || data.lessonVideoID
    );
  }

  // Convert to DTO for API responses
  toDTO(): any {
    return {
      lessonID: this._id,
      title: this._title,
      lessonType: this._lessonType,
      duration: this._duration,
      complexityLevel: this._complexityLevel,
      ordinal: this._ordinal,
      courseID: this._courseID,
      createdTime: this._createdTime,
      updatedTime: this._updatedTime,
      url: this._url,
      lessonVideoID: this._lessonVideoID,
      content: this._url // For compatibility with existing code
    };
  }
}

// Document Lesson entity
export class DocumentLesson extends Lesson {
  private _content: string;
  private _lessonDocumentID?: number;

  constructor(
    id: number,
    title: string,
    duration: number,
    complexityLevel: ComplexityLevel,
    ordinal: number,
    courseID: number,
    content: string,
    createdTime: Date,
    updatedTime?: Date,
    lessonDocumentID?: number
  ) {
    super(id, title, LessonType.DOCUMENT, duration, complexityLevel, ordinal, courseID, createdTime, updatedTime);
    this._content = content;
    this._lessonDocumentID = lessonDocumentID;
  }

  // Getters
  get content(): string {
    return this._content;
  }

  get lessonDocumentID(): number | undefined {
    return this._lessonDocumentID;
  }

  // Factory method to create a DocumentLesson from raw data
  static create(data: any): DocumentLesson {
    return new DocumentLesson(
      data.LessonID || data.lessonID,
      data.Title || data.title,
      data.Duration || data.duration || 0,
      data.ComplexityLevel || data.complexityLevel || ComplexityLevel.BEGINNER,
      data.Ordinal || data.ordinal || 0,
      data.CourseID || data.courseID,
      data.Content || data.content || '',
      data.CreatedTime || data.createdTime || new Date(),
      data.UpdatedTime || data.updatedTime,
      data.LessonDocumentID || data.lessonDocumentID
    );
  }

  // Convert to DTO for API responses
  toDTO(): any {
    return {
      lessonID: this._id,
      title: this._title,
      lessonType: this._lessonType,
      duration: this._duration,
      complexityLevel: this._complexityLevel,
      ordinal: this._ordinal,
      courseID: this._courseID,
      createdTime: this._createdTime,
      updatedTime: this._updatedTime,
      content: this._content,
      lessonDocumentID: this._lessonDocumentID
    };
  }
}

// Factory function to create the appropriate Lesson type based on data
export function createLesson(data: any): Lesson {
  const lessonType = data.LessonType || data.lessonType;
  
  if (lessonType === LessonType.VIDEO) {
    return VideoLesson.create(data);
  } else if (lessonType === LessonType.DOCUMENT) {
    return DocumentLesson.create(data);
  } else {
    throw new Error(`Unsupported lesson type: ${lessonType}`);
  }
}
