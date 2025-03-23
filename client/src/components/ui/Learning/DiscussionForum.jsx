import React, { useState, useEffect } from 'react'
import { Smile, Paperclip, Image, Send, UserCircle, Heart, Share2, MessageSquare, MoreHorizontal } from 'lucide-react'
import PublicService from '../../../services/public.service'

const DiscussionForumService = {
    // Logic cho message
    useMessages: () => {
        const messages = [];
        const messageList = [];

        return {
            messages,
            messageList,
            setMessages: (newMessages) => {
                messages.length = 0;
                messages.push(...newMessages);
            },
            setMessageList: (newMessageList) => {
                messageList.length = 0;
                messageList.push(...newMessageList);
            }
        };
    },

    // Fetch messages từ API
    fetchMessages: async (courseID) => {
        try {
            const response = await PublicService.forum.getMessagesByCourse(courseID);
            return response.data;
        } catch (error) {
            console.error('Error fetching messages:', error);
            return [];
        }
    },

    // Gửi message mới
    sendMessage: async (content, courseID, userID) => {
        if (content.trim() === '') return null;

        try {
            const response = await PublicService.forum.createMessage({
                content,
                courseID,
                userID,
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            return null;
        }
    },

    // Format thời gian
    formatMessageTime: (timestamp) => {
        const now = new Date();
        const msgDate = new Date(timestamp);
        const diffMinutes = Math.floor((now - msgDate) / (1000 * 60));

        if (diffMinutes < 1) return 'Vừa xong';
        if (diffMinutes < 60) return `${diffMinutes} phút trước`;

        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours} giờ trước`;

        const diffDays = Math.floor(diffHours / 24);
        if (diffDays < 7) return `${diffDays} ngày trước`;

        return msgDate.toLocaleDateString('vi-VN');
    }
};

const ChatWindow = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const courseID = 1
    const userID = 1

    const fetchMessages = async () => {
        setLoading(true)
        try {
            const messagesData = await DiscussionForumService.fetchMessages(courseID)
            setMessages(messagesData || [])
        } catch (error) {
            console.error('Error fetching messages:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSendMessage = async (messageContent) => {
        await DiscussionForumService.sendMessage(messageContent, courseID, userID)
        fetchMessages()
    }

    useEffect(() => {
        fetchMessages()

        // Auto-refresh every 30 seconds for social media feel
        const intervalId = setInterval(fetchMessages, 30000);
        return () => clearInterval(intervalId);
    }, [])

    return (
        <div className="bg-gray-100 rounded-lg shadow h-[calc(100vh-12rem)] flex flex-col">
            <div className="p-3 bg-white border-b border-gray-200 flex items-center justify-between sticky top-0 z-10">
                <h2 className="font-bold text-lg">Bình luận</h2>
                <button className="text-blue-500 text-sm font-medium">Mới nhất</button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50">
                {loading ? (
                    <div className="flex justify-center items-center h-32 my-4">
                        <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-64 p-4">
                        <MessageSquare className="h-12 w-12 text-gray-300 mb-4" />
                        <p className="text-gray-500 text-center">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {messages.map((message) => (
                            <div
                                key={message.ForumMessageID}
                                className="bg-white p-4 hover:bg-gray-50 max-w-[60vw]"
                            >
                                <div className="flex">
                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden border border-gray-300 ">
                                        <UserCircle className="h-10 w-10 text-gray-500" />
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="font-semibold text-gray-900 mr-2">
                                                    {message.UserName}
                                                </span>
                                                {message.UserRole === 'Instructor' && (
                                                    <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full mr-2">
                                                        Giảng viên
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-500">
                                                    {DiscussionForumService.formatMessageTime(message.CreateAt)}
                                                </span>
                                            </div>
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal className="h-5 w-5" />
                                            </button>
                                        </div>
                                        <p className="text-gray-800 my-2 leading-relaxed break-words">
                                            {message.Content}
                                        </p>
                                        <div className="flex items-center mt-2 text-sm text-gray-500 space-x-4">
                                            <button className="flex items-center hover:text-blue-600 transition-colors duration-150">
                                                <Heart className="h-4 w-4 mr-1" />
                                                <span>Thích</span>
                                            </button>
                                            <button className="flex items-center hover:text-blue-600 transition-colors duration-150">
                                                <MessageSquare className="h-4 w-4 mr-1" />
                                                <span>Trả lời</span>
                                            </button>
                                            <button className="flex items-center hover:text-blue-600 transition-colors duration-150">
                                                <Share2 className="h-4 w-4 mr-1" />
                                                <span>Chia sẻ</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-3 bg-white border-t border-gray-200 sticky bottom-0">
                <MessageInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    )
}

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('')

    const handleSendMessage = async () => {
        if (message.trim() === '') return
        await onSendMessage(message)
        setMessage('')
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="rounded-full bg-gray-100 overflow-hidden flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden mx-2">
                <UserCircle className="h-10 w-10 text-gray-500" />
            </div>
            <div className="flex-1 px-2">
                <input
                    type="text"
                    className="w-full py-2 bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
                    placeholder="Viết bình luận của bạn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="flex items-center">
                <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors duration-150">
                    <Smile className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors duration-150">
                    <Image className="h-5 w-5" />
                </button>
                <button
                    onClick={handleSendMessage}
                    className={`p-2 rounded-full mx-2 flex items-center justify-center ${
                        message.trim() ? 'text-blue-600 hover:text-blue-700' : 'text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!message.trim()}
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}

export default ChatWindow