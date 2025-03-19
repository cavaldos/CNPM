/**
 * Invoice DTO - Data Transfer Objects for Invoice and Invoice Details
 */

// Invoice DTOs
export interface InvoiceCreateDTO {
    totalAmount: number;
    invoiceStatus: string; // Paid, Unpaid, Cancelled
    studentID: number;
}

export interface InvoiceUpdateDTO {
    invoiceID: number;
    totalAmount: number;
    invoiceStatus: string;
    studentID: number;
}

export interface InvoiceResponseDTO {
    invoiceID: number;
    totalAmount: number;
    invoiceStatus: string;
    studentID: number;
    createdDate: Date;
    paidDate?: Date;
    studentName?: string;
    details?: InvoiceDetailResponseDTO[];
}

// Invoice Detail DTOs
export interface InvoiceDetailCreateDTO {
    price: number;
    invoiceID: number;
    courseID: number;
}

export interface InvoiceDetailUpdateDTO {
    invoiceDetailID: number;
    price: number;
    invoiceID: number;
    courseID: number;
}

export interface InvoiceDetailResponseDTO {
    invoiceDetailID: number;
    price: number;
    invoiceID: number;
    courseID: number;
    courseName?: string;
}