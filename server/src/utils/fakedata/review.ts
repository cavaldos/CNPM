import { ReviewResponseDTO } from '../../dto/review.dto';

export const reviews: ReviewResponseDTO[] = [
    {
        reviewID: 1,
        comment: "Great introduction to JavaScript! The instructor explains concepts clearly and the examples are very helpful.",
        rating: 5,
        studentID: 4,
        courseID: 1,
        createdDate: new Date('2023-02-15T14:30:00'),
        studentName: "Emily Davis",
        courseName: "Introduction to JavaScript"
    },
    {
        reviewID: 2,
        comment: "Good course, but I wish there were more practical exercises.",
        rating: 4,
        studentID: 5,
        courseID: 1,
        createdDate: new Date('2023-02-20T09:45:00'),
        studentName: "Michael Brown",
        courseName: "Introduction to JavaScript"
    },
    {
        reviewID: 3,
        comment: "Excellent advanced Python course. I learned a lot about decorators and context managers.",
        rating: 5,
        studentID: 6,
        courseID: 2,
        createdDate: new Date('2023-03-05T16:20:00'),
        studentName: "Sarah Wilson",
        courseName: "Advanced Python Programming"
    },
    {
        reviewID: 4,
        comment: "The Java fundamentals course is well-structured and comprehensive.",
        rating: 4.5,
        studentID: 4,
        courseID: 3,
        createdDate: new Date('2023-03-10T11:15:00'),
        studentName: "Emily Davis",
        courseName: "Java Fundamentals"
    },
    {
        reviewID: 5,
        comment: "This React course is amazing! I've built my first web app following the lessons.",
        rating: 5,
        studentID: 5,
        courseID: 4,
        createdDate: new Date('2023-04-02T13:40:00'),
        studentName: "Michael Brown",
        courseName: "Web Development with React"
    },
    {
        reviewID: 6,
        comment: "The database design course is informative but could use more real-world examples.",
        rating: 4,
        studentID: 8,
        courseID: 5,
        createdDate: new Date('2023-04-15T10:30:00'),
        studentName: "Lisa Anderson",
        courseName: "Database Design and SQL"
    },
    {
        reviewID: 7,
        comment: "Flutter course is excellent for beginners. Clear explanations and good pace.",
        rating: 4.5,
        studentID: 6,
        courseID: 6,
        createdDate: new Date('2023-04-25T15:10:00'),
        studentName: "Sarah Wilson",
        courseName: "Mobile App Development with Flutter"
    },
    {
        reviewID: 8,
        comment: "The JavaScript course helped me understand the basics, but I needed additional resources for some topics.",
        rating: 3.5,
        studentID: 8,
        courseID: 1,
        createdDate: new Date('2023-03-01T09:20:00'),
        studentName: "Lisa Anderson",
        courseName: "Introduction to JavaScript"
    }
]; 