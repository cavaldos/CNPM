/**
 * Notify DTO - Data Transfer Objects for Notification entity
 */

export interface NotifyCreateDTO {
    messageNotify: string;
    statusNotify: string; // Read, Unread
    receiveUserID: number;
}

export interface NotifyUpdateDTO {
    notifyID: number;
    messageNotify: string;
    statusNotify: string;
}

export interface NotifyResponseDTO {
    notifyID: number;
    messageNotify: string;
    statusNotify: string;
    receiveUserID: number;
    createdDate: Date;
    receiverName?: string;
}