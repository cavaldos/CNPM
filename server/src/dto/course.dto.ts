/**
 * Course DTO - Data Transfer Objects for Course entity
 */

export interface CourseCreateDTO {
    title: string;
    topic: string;
    description: string;
    image: string;
    price: number;
    instructorID: number;
}

export interface CourseUpdateDTO {
    courseID: number;
    title: string;
    topic: string;
    description: string;
    image: string;
    price: number;
    instructorID: number;
}

export interface CourseResponseDTO {
    courseID: number;
    title: string;
    topic: string;
    description: string;
    image: string;
    price: number;
    instructorID: number;
    createTime: Date;
    updateTime?: Date;
    instructorName?: string;
    reviewCount?: number;
    lessonCount?: number;
    averageRating?: number;
}