/**
 * LearnProgress DTO - Data Transfer Objects for Learning Progress entity
 */

export interface LearnProgressCreateDTO {
    studentID: number;
    lessonID: number;
    processStatus: string; // In Progress, Completed, Not Started
    startTime?: Date;
    completionTime?: Date;
}

export interface LearnProgressUpdateDTO {
    progressID: number;
    processStatus: string;
    startTime?: Date;
    completionTime?: Date;
}

export interface LearnProgressResponseDTO {
    progressID: number;
    studentID: number;
    lessonID: number;
    processStatus: string;
    startTime: Date;
    completionTime?: Date;
    studentName?: string;
    lessonName?: string;
    courseName?: string;
    percentageComplete?: number;
}