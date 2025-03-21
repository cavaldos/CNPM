/**
 * Review DTO - Data Transfer Objects for Review entity
 */

export interface ReviewCreateDTO {
    comment: string;
    rating: number; // 1-5 stars
    studentID: number;
    courseID: number;
}

export interface ReviewUpdateDTO {
    reviewID: number;
    comment: string;
    rating: number;
}

export interface ReviewResponseDTO {
    reviewID: number;
    comment: string;
    rating: number;
    studentID: number;
    courseID: number;
    createdDate: Date;
    updatedDate?: Date;
    studentName?: string;
    courseName?: string;
}