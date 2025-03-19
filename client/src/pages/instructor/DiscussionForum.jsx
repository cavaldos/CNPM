import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const DiscussionForum = () => {
    const { courseId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [courseInfo, setCourseInfo] = useState(null);
    const messagesEndRef = useRef(null);

    // Mock data for course
    const mockCourseInfo = {
        id: courseId,
        title: "Nhập môn lập trình Python",
        participants: 24,
    };

    // Mock data for messages
    const mockMessages = [
        {
            id: 1,
            sender: {
                id: 101,
                name: "GS. Nguyễn Văn A",
                avatar: "https://i.pravatar.cc/150?img=1",
                role: "instructor",
            },
            content: "Chào mọi người, hôm nay chúng ta sẽ thảo luận về gradient descent trong machine learning nhé.",
            timestamp: new Date(2023, 10, 1, 10, 30).toISOString(),
        },
        {
            id: 2,
            sender: {
                id: 202,
                name: "Trần Thị B",
                avatar: "https://i.pravatar.cc/150?img=5",
                role: "student",
            },
            content: "Em chưa hiểu phần learning rate ạ. Làm sao để chọn giá trị phù hợp?",
            timestamp: new Date(2023, 10, 1, 10, 32).toISOString(),
        },
        {
            id: 3,
            sender: {
                id: 101,
                name: "GS. Nguyễn Văn A",
                avatar: "https://i.pravatar.cc/150?img=1",
                role: "instructor",
            },
            content:
                "Learning rate là một siêu tham số quan trọng. Bạn cần chọn giá trị nhỏ để tránh vượt qua cực tiểu, nhưng không quá nhỏ để quá trình học nhanh.",
            timestamp: new Date(2023, 10, 1, 10, 35).toISOString(),
        },
        {
            id: 4,
            sender: {
                id: 303,
                name: "Lê Văn C",
                avatar: "https://i.pravatar.cc/150?img=8",
                role: "student",
            },
            content: "Em cũng đang gặp vấn đề tương tự. Khi em thử tăng learning rate, mô hình bị diverge.",
            timestamp: new Date(2023, 10, 1, 10, 40).toISOString(),
        },
    ];

    // Mock data for participants
    const mockParticipants = [
        { id: 101, name: "GS. Nguyễn Văn A", role: "instructor", status: "online" },
        { id: 202, name: "Trần Thị B", role: "student", status: "online" },
        { id: 303, name: "Lê Văn C", role: "student", status: "offline" },
    ];

    useEffect(() => {
        setTimeout(() => {
            setCourseInfo(mockCourseInfo);
            setMessages(mockMessages);
            setLoading(false);
        }, 800);
    }, [courseId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newMsg = {
            id: Date.now(),
            sender: {
                id: 101,
                name: "GS. Nguyễn Văn A",
                avatar: "https://i.pravatar.cc/150?img=1",
                role: "instructor",
            },
            content: newMessage,
            timestamp: new Date().toISOString(),
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <div className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-4">
            {/* Left Section - Discussion */}
            <div className="w-full md:w-2/3">
                <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">
                                {courseInfo?.title}
                            </h1>
                            <p className="text-sm text-gray-600">
                                {courseInfo?.participants} thành viên tham gia
                            </p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                            + Thảo luận mới
                        </button>
                    </div>
                    <div className="relative mb-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm cuộc thảo luận..."
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 h-[calc(100vh-300px)] overflow-y-auto">
                    {messages.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <p className="text-gray-500">
                                Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!
                            </p>
                        </div>
                    ) : (
                        messages.map((message) => (
                            <div key={message.id} className="mb-4">
                                <div className="flex items-start">
                                    <img
                                        src={message.sender.avatar}
                                        alt={message.sender.name}
                                        className="w-10 h-10 rounded-full mr-3"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center mb-1">
                                            <span className="font-semibold text-gray-900 mr-2">
                                                {message.sender.name}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(message.timestamp)}
                                            </span>
                                            {message.sender.role === "instructor" && (
                                                <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                                    Giảng viên
                                                </span>
                                            )}
                                        </div>
                                        <div className="bg-gray-100 p-3 rounded-lg text-gray-800">
                                            <p className="text-sm whitespace-pre-wrap">
                                                {message.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mt-4">
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Nhập tin nhắn của bạn..."
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex items-center ml-2 space-x-2">
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                            </button>
                            <button
                                type="submit"
                                disabled={!newMessage.trim()}
                                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Gửi
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Right Section - Participants */}
            <div className="w-full md:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Thành viên</h2>
                        <input
                            type="text"
                            placeholder="Tìm kiếm thành viên..."
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        {mockParticipants.map((participant) => (
                            <div key={participant.id} className="flex items-center">
                                <div
                                    className={`w-3 h-3 rounded-full mr-2 ${participant.status === "online" ? "bg-green-500" : "bg-gray-400"
                                        }`}
                                />
                                <span
                                    className={`flex-1 text-sm ${participant.role === "instructor"
                                            ? "font-semibold text-blue-800"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {participant.name}
                                </span>
                                {participant.role === "instructor" && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                        Giảng viên
                                    </span>
                                )}
                                {participant.status === "offline" && (
                                    <span className="text-xs text-gray-500 ml-2">
                                        15 phút trước
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscussionForum;