import { InvoiceResponseDTO, InvoiceDetailResponseDTO } from '../../dto/invoice.dto';

export const invoices: InvoiceResponseDTO[] = [
    {
        invoiceID: 1,
        totalAmount: 49.99,
        invoiceStatus: "Paid",
        studentID: 4,
        createdDate: new Date('2023-01-30T09:10:00'),
        paidDate: new Date('2023-01-30T09:12:00'),
        studentName: "Emily Davis",
        details: [
            {
                invoiceDetailID: 1,
                price: 49.99,
                invoiceID: 1,
                courseID: 1,
                courseName: "Introduction to JavaScript"
            }
        ]
    },
    {
        invoiceID: 2,
        totalAmount: 49.99,
        invoiceStatus: "Paid",
        studentID: 5,
        createdDate: new Date('2023-02-01T14:25:00'),
        paidDate: new Date('2023-02-01T14:28:00'),
        studentName: "Michael Brown",
        details: [
            {
                invoiceDetailID: 2,
                price: 49.99,
                invoiceID: 2,
                courseID: 1,
                courseName: "Introduction to JavaScript"
            }
        ]
    },
    {
        invoiceID: 3,
        totalAmount: 69.99,
        invoiceStatus: "Paid",
        studentID: 6,
        createdDate: new Date('2023-02-15T10:40:00'),
        paidDate: new Date('2023-02-15T10:43:00'),
        studentName: "Sarah Wilson",
        details: [
            {
                invoiceDetailID: 3,
                price: 69.99,
                invoiceID: 3,
                courseID: 2,
                courseName: "Advanced Python Programming"
            }
        ]
    },
    {
        invoiceID: 4,
        totalAmount: 59.99,
        invoiceStatus: "Paid",
        studentID: 4,
        createdDate: new Date('2023-02-20T15:55:00'),
        paidDate: new Date('2023-02-20T15:58:00'),
        studentName: "Emily Davis",
        details: [
            {
                invoiceDetailID: 4,
                price: 59.99,
                invoiceID: 4,
                courseID: 3,
                courseName: "Java Fundamentals"
            }
        ]
    },
    {
        invoiceID: 5,
        totalAmount: 79.99,
        invoiceStatus: "Paid",
        studentID: 5,
        createdDate: new Date('2023-03-10T11:25:00'),
        paidDate: new Date('2023-03-10T11:28:00'),
        studentName: "Michael Brown",
        details: [
            {
                invoiceDetailID: 5,
                price: 79.99,
                invoiceID: 5,
                courseID: 4,
                courseName: "Web Development with React"
            }
        ]
    },
    {
        invoiceID: 6,
        totalAmount: 54.99,
        invoiceStatus: "Paid",
        studentID: 8,
        createdDate: new Date('2023-03-25T13:40:00'),
        paidDate: new Date('2023-03-25T13:43:00'),
        studentName: "Lisa Anderson",
        details: [
            {
                invoiceDetailID: 6,
                price: 54.99,
                invoiceID: 6,
                courseID: 5,
                courseName: "Database Design and SQL"
            }
        ]
    },
    {
        invoiceID: 7,
        totalAmount: 69.99,
        invoiceStatus: "Paid",
        studentID: 6,
        createdDate: new Date('2023-04-15T09:25:00'),
        paidDate: new Date('2023-04-15T09:28:00'),
        studentName: "Sarah Wilson",
        details: [
            {
                invoiceDetailID: 7,
                price: 69.99,
                invoiceID: 7,
                courseID: 6,
                courseName: "Mobile App Development with Flutter"
            }
        ]
    },
    {
        invoiceID: 8,
        totalAmount: 49.99,
        invoiceStatus: "Paid",
        studentID: 8,
        createdDate: new Date('2023-02-05T15:15:00'),
        paidDate: new Date('2023-02-05T15:18:00'),
        studentName: "Lisa Anderson",
        details: [
            {
                invoiceDetailID: 8,
                price: 49.99,
                invoiceID: 8,
                courseID: 1,
                courseName: "Introduction to JavaScript"
            }
        ]
    },
    {
        invoiceID: 9,
        totalAmount: 79.99,
        invoiceStatus: "Paid",
        studentID: 4,
        createdDate: new Date('2023-03-15T10:05:00'),
        paidDate: new Date('2023-03-15T10:08:00'),
        studentName: "Emily Davis",
        details: [
            {
                invoiceDetailID: 9,
                price: 79.99,
                invoiceID: 9,
                courseID: 4,
                courseName: "Web Development with React"
            }
        ]
    },
    {
        invoiceID: 10,
        totalAmount: 59.99,
        invoiceStatus: "Cancelled",
        studentID: 5,
        createdDate: new Date('2023-02-25T14:45:00'),
        studentName: "Michael Brown",
        details: [
            {
                invoiceDetailID: 10,
                price: 59.99,
                invoiceID: 10,
                courseID: 3,
                courseName: "Java Fundamentals"
            }
        ]
    }
];

export const invoiceDetails: InvoiceDetailResponseDTO[] = [
    {
        invoiceDetailID: 1,
        price: 49.99,
        invoiceID: 1,
        courseID: 1,
        courseName: "Introduction to JavaScript"
    },
    {
        invoiceDetailID: 2,
        price: 49.99,
        invoiceID: 2,
        courseID: 1,
        courseName: "Introduction to JavaScript"
    },
    {
        invoiceDetailID: 3,
        price: 69.99,
        invoiceID: 3,
        courseID: 2,
        courseName: "Advanced Python Programming"
    },
    {
        invoiceDetailID: 4,
        price: 59.99,
        invoiceID: 4,
        courseID: 3,
        courseName: "Java Fundamentals"
    },
    {
        invoiceDetailID: 5,
        price: 79.99,
        invoiceID: 5,
        courseID: 4,
        courseName: "Web Development with React"
    },
    {
        invoiceDetailID: 6,
        price: 54.99,
        invoiceID: 6,
        courseID: 5,
        courseName: "Database Design and SQL"
    },
    {
        invoiceDetailID: 7,
        price: 69.99,
        invoiceID: 7,
        courseID: 6,
        courseName: "Mobile App Development with Flutter"
    },
    {
        invoiceDetailID: 8,
        price: 49.99,
        invoiceID: 8,
        courseID: 1,
        courseName: "Introduction to JavaScript"
    },
    {
        invoiceDetailID: 9,
        price: 79.99,
        invoiceID: 9,
        courseID: 4,
        courseName: "Web Development with React"
    },
    {
        invoiceDetailID: 10,
        price: 59.99,
        invoiceID: 10,
        courseID: 3,
        courseName: "Java Fundamentals"
    }
]; 