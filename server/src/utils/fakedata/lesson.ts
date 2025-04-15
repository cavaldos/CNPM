import { LessonResponseDTO } from '../../dto/lesson.dto';

export const lessons: LessonResponseDTO[] = [
    // JavaScript Course Lessons
    {
        lessonID: 1,
        title: "Introduction to JavaScript",
        duration: 45,
        complexityLevel: "Easy",
        lessonType: "Video",
        ordinal: 1,
        courseID: 1,
        createdTime: new Date('2023-01-26T10:00:00'),
        videoURL: "https://example.com/videos/js-intro.mp4",
        courseName: "Introduction to JavaScript"
    },
    {
        lessonID: 2,
        title: "Variables and Data Types",
        duration: 60,
        complexityLevel: "Easy",
        lessonType: "Video",
        ordinal: 2,
        courseID: 1,
        createdTime: new Date('2023-01-26T11:30:00'),
        videoURL: "https://example.com/videos/js-variables.mp4",
        courseName: "Introduction to JavaScript"
    },
    {
        lessonID: 3,
        title: "Functions and Scope",
        duration: 75,
        complexityLevel: "Medium",
        lessonType: "Video",
        ordinal: 3,
        courseID: 1,
        createdTime: new Date('2023-01-27T09:15:00'),
        videoURL: "https://example.com/videos/js-functions.mp4",
        courseName: "Introduction to JavaScript"
    },
    {
        lessonID: 4,
        title: "JavaScript Arrays",
        duration: 60,
        complexityLevel: "Medium",
        lessonType: "Document",
        ordinal: 4,
        courseID: 1,
        createdTime: new Date('2023-01-27T14:30:00'),
        documentContent: "# JavaScript Arrays\n\nArrays in JavaScript are used to store multiple values in a single variable...",
        courseName: "Introduction to JavaScript"
    },

    // Python Course Lessons
    {
        lessonID: 5,
        title: "Decorators in Python",
        duration: 90,
        complexityLevel: "Hard",
        lessonType: "Video",
        ordinal: 1,
        courseID: 2,
        createdTime: new Date('2023-02-11T09:00:00'),
        videoURL: "https://example.com/videos/python-decorators.mp4",
        courseName: "Advanced Python Programming"
    },
    {
        lessonID: 6,
        title: "Generators and Iterators",
        duration: 75,
        complexityLevel: "Hard",
        lessonType: "Video",
        ordinal: 2,
        courseID: 2,
        createdTime: new Date('2023-02-11T11:15:00'),
        videoURL: "https://example.com/videos/python-generators.mp4",
        courseName: "Advanced Python Programming"
    },
    {
        lessonID: 7,
        title: "Context Managers",
        duration: 60,
        complexityLevel: "Medium",
        lessonType: "Document",
        ordinal: 3,
        courseID: 2,
        createdTime: new Date('2023-02-12T10:30:00'),
        documentContent: "# Context Managers in Python\n\nContext managers are a powerful feature in Python that allows you to allocate and release resources precisely when you want to...",
        courseName: "Advanced Python Programming"
    },

    // Java Course Lessons
    {
        lessonID: 8,
        title: "Introduction to Java",
        duration: 60,
        complexityLevel: "Easy",
        lessonType: "Video",
        ordinal: 1,
        courseID: 3,
        createdTime: new Date('2023-02-16T09:30:00'),
        videoURL: "https://example.com/videos/java-intro.mp4",
        courseName: "Java Fundamentals"
    },
    {
        lessonID: 9,
        title: "Object-Oriented Programming in Java",
        duration: 90,
        complexityLevel: "Medium",
        lessonType: "Video",
        ordinal: 2,
        courseID: 3,
        createdTime: new Date('2023-02-16T11:45:00'),
        videoURL: "https://example.com/videos/java-oop.mp4",
        courseName: "Java Fundamentals"
    },

    // React Course Lessons
    {
        lessonID: 10,
        title: "Introduction to React",
        duration: 60,
        complexityLevel: "Easy",
        lessonType: "Video",
        ordinal: 1,
        courseID: 4,
        createdTime: new Date('2023-03-06T09:15:00'),
        videoURL: "https://example.com/videos/react-intro.mp4",
        courseName: "Web Development with React"
    },
    {
        lessonID: 11,
        title: "Components and Props",
        duration: 75,
        complexityLevel: "Medium",
        lessonType: "Video",
        ordinal: 2,
        courseID: 4,
        createdTime: new Date('2023-03-06T11:30:00'),
        videoURL: "https://example.com/videos/react-components.mp4",
        courseName: "Web Development with React"
    },
    {
        lessonID: 12,
        title: "State and Lifecycle",
        duration: 90,
        complexityLevel: "Medium",
        lessonType: "Document",
        ordinal: 3,
        courseID: 4,
        createdTime: new Date('2023-03-07T10:00:00'),
        documentContent: "# State and Lifecycle in React\n\nState is a JavaScript object that stores a component's dynamic data and determines the component's behavior...",
        courseName: "Web Development with React"
    }
];

export const lessonVideos = [
    {
        lessonVideoID: 1,
        url: "https://example.com/videos/js-intro.mp4",
        lessonID: 1
    },
    {
        lessonVideoID: 2,
        url: "https://example.com/videos/js-variables.mp4",
        lessonID: 2
    },
    {
        lessonVideoID: 3,
        url: "https://example.com/videos/js-functions.mp4",
        lessonID: 3
    },
    {
        lessonVideoID: 4,
        url: "https://example.com/videos/python-decorators.mp4",
        lessonID: 5
    },
    {
        lessonVideoID: 5,
        url: "https://example.com/videos/python-generators.mp4",
        lessonID: 6
    },
    {
        lessonVideoID: 6,
        url: "https://example.com/videos/java-intro.mp4",
        lessonID: 8
    },
    {
        lessonVideoID: 7,
        url: "https://example.com/videos/java-oop.mp4",
        lessonID: 9
    },
    {
        lessonVideoID: 8,
        url: "https://example.com/videos/react-intro.mp4",
        lessonID: 10
    },
    {
        lessonVideoID: 9,
        url: "https://example.com/videos/react-components.mp4",
        lessonID: 11
    }
];

export const lessonDocuments = [
    {
        lessonDocumentID: 1,
        lessonID: 4,
        content: "# JavaScript Arrays\n\nArrays in JavaScript are used to store multiple values in a single variable. This document covers array creation, manipulation, and common methods."
    },
    {
        lessonDocumentID: 2,
        lessonID: 7,
        content: "# Context Managers in Python\n\nContext managers are a powerful feature in Python that allows you to allocate and release resources precisely when you want to. This document explains how to use the 'with' statement and how to create your own context managers."
    },
    {
        lessonDocumentID: 3,
        lessonID: 12,
        content: "# State and Lifecycle in React\n\nState is a JavaScript object that stores a component's dynamic data and determines the component's behavior. This document covers state initialization, updates, and lifecycle methods in React components."
    }
]; 