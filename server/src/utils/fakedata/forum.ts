import { ForumMessageResponseDTO } from '../../dto/forum.dto';

export const forumMessages: ForumMessageResponseDTO[] = [
    {
        forumMessageID: 1,
        content: "Hello everyone! I'm having trouble understanding closures in JavaScript. Can someone explain them in simple terms?",
        courseID: 1,
        userID: 4,
        createAt: new Date('2023-02-05T10:30:00'),
        userName: "Emily Davis",
        courseName: "Introduction to JavaScript"
    },
    {
        forumMessageID: 2,
        content: "Closures are functions that remember the environment they were created in. They have access to variables from their outer function even after that function has returned. Think of them as functions with a backpack of variables they can access later.",
        courseID: 1,
        userID: 2,
        createAt: new Date('2023-02-05T11:15:00'),
        userName: "Jane Smith",
        courseName: "Introduction to JavaScript"
    },
    {
        forumMessageID: 3,
        content: "Thanks for the explanation! That makes it much clearer. Do you have any simple examples to illustrate this concept?",
        courseID: 1,
        userID: 4,
        createAt: new Date('2023-02-05T12:00:00'),
        userName: "Emily Davis",
        courseName: "Introduction to JavaScript"
    },
    {
        forumMessageID: 4,
        content: "I'm struggling with Python decorators. The syntax is confusing me. Any tips?",
        courseID: 2,
        userID: 6,
        createAt: new Date('2023-02-18T14:20:00'),
        userName: "Sarah Wilson",
        courseName: "Advanced Python Programming"
    },
    {
        forumMessageID: 5,
        content: "Think of decorators as wrappers around functions. They allow you to modify the behavior of a function without changing its code. The @decorator syntax is just syntactic sugar for function = decorator(function).",
        courseID: 2,
        userID: 2,
        createAt: new Date('2023-02-18T15:05:00'),
        userName: "Jane Smith",
        courseName: "Advanced Python Programming"
    },
    {
        forumMessageID: 6,
        content: "Is anyone else having issues with the React state exercise in lesson 12? My component keeps re-rendering infinitely.",
        courseID: 4,
        userID: 5,
        createAt: new Date('2023-03-12T09:45:00'),
        userName: "Michael Brown",
        courseName: "Web Development with React"
    },
    {
        forumMessageID: 7,
        content: "That sounds like you might be updating state inside useEffect without a dependency array, or with a dependency that changes every render. Make sure your useEffect has the correct dependencies.",
        courseID: 4,
        userID: 2,
        createAt: new Date('2023-03-12T10:30:00'),
        userName: "Jane Smith",
        courseName: "Web Development with React"
    },
    {
        forumMessageID: 8,
        content: "You're right! I was missing the dependency array. It works perfectly now. Thank you!",
        courseID: 4,
        userID: 5,
        createAt: new Date('2023-03-12T11:15:00'),
        userName: "Michael Brown",
        courseName: "Web Development with React"
    }
]; 