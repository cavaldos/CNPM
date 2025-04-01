import { CourseResponseDTO } from '../dto/course.dto';

export const datasearch = {
    results: [
        "JavaScript",
        "Pythfsadf sfh sdh fasfhsahfshfksdhkashfkjasd ádkasdkhfkajsdhfkjasdhfkjon",
        "Java",
        "C++",
        "C#",
    ],
    recent: [
        "HTML",
        "CSS",
        "Reafsadfsadfasdfsadfasdfasdfsadfasd. ág. àgsjad fjsad fasfjgasdjfg jasdfct",
        "Node.js",
        "Angular",
    ]
}

export const paginationData = {
    currentPage: 1,
    pageSize: 10,
    totalPages: 5,
    totalItems: 47,
    items: [
        { id: 1, name: "Introduction to JavaScript", duration: "8 weeks", instructor: "John Doe" },
        { id: 2, name: "Advanced Python", duration: "10 weeks", instructor: "Jane Smith" },
        { id: 3, name: "Java Fundamentals", duration: "6 weeks", instructor: "Bob Johnson" },
        { id: 4, name: "C++ for Beginners", duration: "12 weeks", instructor: "Alice Williams" },
        { id: 5, name: "Web Development with React", duration: "8 weeks", instructor: "Michael Brown" },
        { id: 6, name: "Node.js Essentials", duration: "5 weeks", instructor: "Sarah Davis" },
        { id: 7, name: "Database Design", duration: "4 weeks", instructor: "Tom Wilson" },
        { id: 8, name: "Machine Learning Basics", duration: "14 weeks", instructor: "Emily Thompson" },
        { id: 9, name: "Mobile App Development", duration: "9 weeks", instructor: "David Miller" },
        { id: 10, name: "Cloud Computing", duration: "7 weeks", instructor: "Lisa Anderson" }
    ],
    hasNextPage: true,
    hasPreviousPage: false
}

export const courses: CourseResponseDTO[] = [
    {
        courseID: 1,
        title: "Introduction to JavaScript",
        topic: "Web Development",
        description: "Learn the fundamentals of JavaScript programming language. This course covers variables, data types, functions, objects, arrays, and DOM manipulation.",
        image: "https://example.com/images/javascript-intro.jpg",
        price: 49.99,
        instructorID: 2,
        createTime: new Date('2023-01-25T09:30:00'),
        instructorName: "Jane Smith",
        reviewCount: 15,
        lessonCount: 12,
        averageRating: 4.7
    },
    {
        courseID: 2,
        title: "Advanced Python Programming",
        topic: "Programming",
        description: "Take your Python skills to the next level. Learn about decorators, generators, context managers, and advanced OOP concepts.",
        image: "https://example.com/images/python-advanced.jpg",
        price: 69.99,
        instructorID: 2,
        createTime: new Date('2023-02-10T14:15:00'),
        instructorName: "Jane Smith",
        reviewCount: 8,
        lessonCount: 10,
        averageRating: 4.8
    },
    {
        courseID: 3,
        title: "Java Fundamentals",
        topic: "Programming",
        description: "A comprehensive introduction to Java programming. Learn about classes, objects, inheritance, interfaces, and exception handling.",
        image: "https://example.com/images/java-fundamentals.jpg",
        price: 59.99,
        instructorID: 3,
        createTime: new Date('2023-02-15T11:45:00'),
        instructorName: "Robert Johnson",
        reviewCount: 12,
        lessonCount: 15,
        averageRating: 4.5
    },
    {
        courseID: 4,
        title: "Web Development with React",
        topic: "Web Development",
        description: "Learn to build modern web applications with React. This course covers components, props, state, hooks, and Redux.",
        image: "https://example.com/images/react-web-dev.jpg",
        price: 79.99,
        instructorID: 2,
        createTime: new Date('2023-03-05T10:30:00'),
        instructorName: "Jane Smith",
        reviewCount: 20,
        lessonCount: 18,
        averageRating: 4.9
    },
    {
        courseID: 5,
        title: "Database Design and SQL",
        topic: "Database",
        description: "Learn the principles of database design and SQL. This course covers normalization, relationships, queries, and transactions.",
        image: "https://example.com/images/database-design.jpg",
        price: 54.99,
        instructorID: 3,
        createTime: new Date('2023-03-20T13:45:00'),
        instructorName: "Robert Johnson",
        reviewCount: 10,
        lessonCount: 14,
        averageRating: 4.6
    },
    {
        courseID: 6,
        title: "Mobile App Development with Flutter",
        topic: "Mobile Development",
        description: "Build cross-platform mobile apps with Flutter. Learn Dart programming, widgets, state management, and app deployment.",
        image: "https://example.com/images/flutter-mobile.jpg",
        price: 69.99,
        instructorID: 7,
        createTime: new Date('2023-04-10T15:30:00'),
        instructorName: "David Miller",
        reviewCount: 5,
        lessonCount: 16,
        averageRating: 4.7
    }
];

