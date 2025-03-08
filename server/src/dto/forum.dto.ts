/**
 * Forum DTO - Data Transfer Objects for Forum Messages
 */

export interface ForumMessageCreateDTO {
    content: string;
    courseID: number;
    userID: number;
}

export interface ForumMessageUpdateDTO {
    forumMessageID: number;
    content: string;
}

export interface ForumMessageResponseDTO {
    forumMessageID: number;
    content: string;
    courseID: number;
    userID: number;
    createAt: Date;
    updateAt?: Date;
    userName?: string;
    courseName?: string;
    replies?: ForumMessageResponseDTO[];
}