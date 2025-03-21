/**
 * User DTO - Data Transfer Objects for User entity
 */

export interface UserCreateDTO {
    userName: string;
    email: string;
    fullName: string;
    role: string;
}

export interface UserUpdateDTO {
    userID: number;
    userName: string;
    email: string;
    fullName: string;
    role: string;
}

export interface UserResponseDTO {
    userID: number;
    userName: string;
    email: string;
    fullName: string;
    role: string;
    createdTime: Date;
    updatedTime?: Date;
    coursesCount?: number;
    invoicesCount?: number;
}

export interface UserAuthDTO {
    userID: number;
    userName: string;
    email: string;
    role: string;
    token?: string;
}