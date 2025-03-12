import { NotifyResponseDTO } from '../dto/notify.dto';

export const notifications: NotifyResponseDTO[] = [
    {
        notifyID: 1,
        messageNotify: "Welcome to the Introduction to JavaScript course! Start your learning journey now.",
        statusNotify: "Read",
        receiveUserID: 4,
        createdDate: new Date('2023-01-30T09:20:00'),
        receiverName: "Emily Davis"
    },
    {
        notifyID: 2,
        messageNotify: "New lesson available: Functions and Scope. Check it out now!",
        statusNotify: "Read",
        receiveUserID: 4,
        createdDate: new Date('2023-01-31T10:00:00'),
        receiverName: "Emily Davis"
    },
    {
        notifyID: 3,
        messageNotify: "Congratulations on completing the JavaScript course! Your certificate is ready.",
        statusNotify: "Read",
        receiveUserID: 4,
        createdDate: new Date('2023-02-05T15:30:00'),
        receiverName: "Emily Davis"
    },
    {
        notifyID: 4,
        messageNotify: "Welcome to the Introduction to JavaScript course! Start your learning journey now.",
        statusNotify: "Read",
        receiveUserID: 5,
        createdDate: new Date('2023-02-01T14:35:00'),
        receiverName: "Michael Brown"
    },
    {
        notifyID: 5,
        messageNotify: "Your instructor has responded to your question in the forum.",
        statusNotify: "UnRead",
        receiveUserID: 4,
        createdDate: new Date('2023-02-05T11:20:00'),
        receiverName: "Emily Davis"
    },
    {
        notifyID: 6,
        messageNotify: "Welcome to the Advanced Python Programming course! Start your learning journey now.",
        statusNotify: "Read",
        receiveUserID: 6,
        createdDate: new Date('2023-02-15T10:50:00'),
        receiverName: "Sarah Wilson"
    },
    {
        notifyID: 7,
        messageNotify: "Your instructor has responded to your question in the forum.",
        statusNotify: "UnRead",
        receiveUserID: 6,
        createdDate: new Date('2023-02-18T15:10:00'),
        receiverName: "Sarah Wilson"
    },
    {
        notifyID: 8,
        messageNotify: "Welcome to the Web Development with React course! Start your learning journey now.",
        statusNotify: "Read",
        receiveUserID: 5,
        createdDate: new Date('2023-03-10T11:35:00'),
        receiverName: "Michael Brown"
    },
    {
        notifyID: 9,
        messageNotify: "Your instructor has responded to your question in the forum.",
        statusNotify: "Read",
        receiveUserID: 5,
        createdDate: new Date('2023-03-12T10:35:00'),
        receiverName: "Michael Brown"
    },
    {
        notifyID: 10,
        messageNotify: "New course available: Mobile App Development with Flutter. Enroll now!",
        statusNotify: "UnRead",
        receiveUserID: 4,
        createdDate: new Date('2023-04-11T09:00:00'),
        receiverName: "Emily Davis"
    }
]; 