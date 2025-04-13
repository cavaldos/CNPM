/**
 * LearnProgress Domain Entity
 * 
 * This file defines the LearnProgress entity and related value objects in the domain model.
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
export class LearnProgressCreatedEvent {
  constructor(public readonly progressID: number) {}
}

export class LearnProgressUpdatedEvent {
  constructor(public readonly progressID: number) {}
}

export class LearnProgressCompletedEvent {
  constructor(public readonly progressID: number) {}
}

// LearnProgress entity
export class LearnProgress {
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
  private _lessonType?: string;
  private _lessonOrdinal?: number;
  private _lessonDuration?: number;

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
    percentageComplete?: number,
    lessonType?: string,
    lessonOrdinal?: number,
    lessonDuration?: number
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
    this._lessonType = lessonType;
    this._lessonOrdinal = lessonOrdinal;
    this._lessonDuration = lessonDuration;
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

  get lessonType(): string | undefined {
    return this._lessonType;
  }

  get lessonOrdinal(): number | undefined {
    return this._lessonOrdinal;
  }

  get lessonDuration(): number | undefined {
    return this._lessonDuration;
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

    if (this._lessonType) {
      dto.lessonType = this._lessonType;
    }

    if (this._lessonOrdinal !== undefined) {
      dto.lessonOrdinal = this._lessonOrdinal;
    }

    if (this._lessonDuration !== undefined) {
      dto.lessonDuration = this._lessonDuration;
    }

    return dto;
  }
}
