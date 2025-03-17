/**
 * Lesson DTO - Data Transfer Objects for Lesson entity
 */

export interface BaseLessonDTO {
    title: string;
    duration: number;
    complexityLevel: string; // Beginner, Intermediate, Advanced
    lessonType: string; // Video, Document
    ordinal: number; // Lesson order in course
    courseID: number;
}

export interface LessonVideoCreateDTO extends BaseLessonDTO {
    url: string; // Video URL
}

export interface LessonVideoUpdateDTO {
    lessonVideoID: number;
    url: string;
}

export interface LessonDocumentCreateDTO extends BaseLessonDTO {
    documentContent: string; // Document content
}

export interface LessonDocumentUpdateDTO {
    lessonDocumentID: number;
    documentContent: string;
}

export interface LessonUpdateDTO {
    lessonID: number;
    title: string;
    duration: number;
    complexityLevel: string;
    lessonType: string;
    ordinal: number;
    courseID: number;
}

export interface LessonResponseDTO {
    lessonID: number;
    title: string;
    duration: number;
    complexityLevel: string;
    lessonType: string;
    ordinal: number;
    courseID: number;
    createdTime: Date;
    updatedTime?: Date;
    videoURL?: string;
    documentContent?: string;
    courseName?: string;
}