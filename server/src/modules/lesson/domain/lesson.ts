/**
 * Lesson Domain Entity
 * 
 * This file defines the Lesson entity and related value objects in the domain model.
 */

// Value Objects
export class LessonTitle {
  private readonly value: string;
  
  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Lesson title cannot be empty');
    }
    
    if (value.length > 100) {
      throw new Error('Lesson title cannot exceed 100 characters');
    }
    
    this.value = value.trim();
  }
  
  getValue(): string {
    return this.value;
  }
}

export class LessonComplexity {
  private readonly value: string;
  private static readonly ALLOWED_VALUES = ['Easy', 'Medium', 'Hard', 'Beginner', 'Intermediate', 'Advanced'];
  
  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Complexity level cannot be empty');
    }
    
    const normalizedValue = value.trim();
    if (!LessonComplexity.ALLOWED_VALUES.includes(normalizedValue)) {
      throw new Error(`Complexity level must be one of: ${LessonComplexity.ALLOWED_VALUES.join(', ')}`);
    }
    
    this.value = normalizedValue;
  }
  
  getValue(): string {
    return this.value;
  }
}

export class LessonType {
  private readonly value: string;
  private static readonly ALLOWED_VALUES = ['Video', 'Document'];
  
  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Lesson type cannot be empty');
    }
    
    const normalizedValue = value.trim();
    if (!LessonType.ALLOWED_VALUES.includes(normalizedValue)) {
      throw new Error(`Lesson type must be one of: ${LessonType.ALLOWED_VALUES.join(', ')}`);
    }
    
    this.value = normalizedValue;
  }
  
  getValue(): string {
    return this.value;
  }
  
  isVideo(): boolean {
    return this.value === 'Video';
  }
  
  isDocument(): boolean {
    return this.value === 'Document';
  }
}

// Domain Events
export class LessonCreatedEvent {
  constructor(public readonly lessonId: number) {}
}

export class LessonUpdatedEvent {
  constructor(public readonly lessonId: number) {}
}

export class LessonDeletedEvent {
  constructor(public readonly lessonId: number) {}
}

// Lesson entity
export class Lesson {
  private _id: number;
  private _title: string;
  private _duration: number;
  private _complexityLevel: string;
  private _lessonType: string;
  private _ordinal: number;
  private _courseID: number;
  private _createdTime: Date;
  private _updatedTime?: Date;
  private _content?: string; // For document lessons
  private _url?: string; // For video lessons
  private _resourceID?: number; // ID of the related resource (video or document)

  constructor(
    id: number,
    title: string,
    duration: number,
    complexityLevel: string,
    lessonType: string,
    ordinal: number,
    courseID: number,
    createdTime: Date,
    updatedTime?: Date,
    content?: string,
    url?: string,
    resourceID?: number
  ) {
    this._id = id;
    this._title = title;
    this._duration = duration;
    this._complexityLevel = complexityLevel;
    this._lessonType = lessonType;
    this._ordinal = ordinal;
    this._courseID = courseID;
    this._createdTime = createdTime;
    this._updatedTime = updatedTime;
    this._content = content;
    this._url = url;
    this._resourceID = resourceID;
  }

  // Getters
  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get duration(): number {
    return this._duration;
  }

  get complexityLevel(): string {
    return this._complexityLevel;
  }

  get lessonType(): string {
    return this._lessonType;
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

  get content(): string | undefined {
    return this._content;
  }

  get url(): string | undefined {
    return this._url;
  }

  get resourceID(): number | undefined {
    return this._resourceID;
  }

  // Domain methods
  isVideo(): boolean {
    return this._lessonType === 'Video';
  }

  isDocument(): boolean {
    return this._lessonType === 'Document';
  }

  updateTitle(title: string): void {
    const lessonTitle = new LessonTitle(title);
    this._title = lessonTitle.getValue();
    this._updatedTime = new Date();
  }

  updateDuration(duration: number): void {
    if (duration <= 0) {
      throw new Error('Duration must be greater than 0');
    }
    this._duration = duration;
    this._updatedTime = new Date();
  }

  updateComplexityLevel(complexityLevel: string): void {
    const lessonComplexity = new LessonComplexity(complexityLevel);
    this._complexityLevel = lessonComplexity.getValue();
    this._updatedTime = new Date();
  }

  updateOrdinal(ordinal: number): void {
    if (ordinal < 0) {
      throw new Error('Ordinal must be a non-negative number');
    }
    this._ordinal = ordinal;
    this._updatedTime = new Date();
  }

  updateContent(content: string): void {
    if (!this.isDocument()) {
      throw new Error('Cannot update content for non-document lessons');
    }
    if (!content || content.trim().length === 0) {
      throw new Error('Content cannot be empty');
    }
    this._content = content.trim();
    this._updatedTime = new Date();
  }

  updateUrl(url: string): void {
    if (!this.isVideo()) {
      throw new Error('Cannot update URL for non-video lessons');
    }
    if (!url || url.trim().length === 0) {
      throw new Error('URL cannot be empty');
    }
    this._url = url.trim();
    this._updatedTime = new Date();
  }

  belongsToCourse(courseId: number): boolean {
    return this._courseID === courseId;
  }

  // Convert to DTO for API responses
  toDTO(): any {
    const dto: any = {
      lessonID: this._id,
      title: this._title,
      duration: this._duration,
      complexityLevel: this._complexityLevel,
      lessonType: this._lessonType,
      ordinal: this._ordinal,
      courseID: this._courseID,
      createdTime: this._createdTime,
      updatedTime: this._updatedTime
    };

    if (this.isVideo() && this._url) {
      dto.videoURL = this._url;
      if (this._resourceID) {
        dto.lessonVideoID = this._resourceID;
      }
    }

    if (this.isDocument() && this._content) {
      dto.documentContent = this._content;
      if (this._resourceID) {
        dto.lessonDocumentID = this._resourceID;
      }
    }

    return dto;
  }
}
