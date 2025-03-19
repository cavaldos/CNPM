import React, { useState, useEffect } from 'react'
import { Smile, Paperclip, Image, Send, UserCircle } from 'lucide-react'
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
        return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
};

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('')

    const handleSendMessage = async () => {
        if (message.trim() === '') return

        await onSendMessage(message)
        setMessage('')
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSendMessage()
        }
    }

    const handleChange = (event) => {
        setMessage(event.target.value)
    }

    return (
        <div className="border rounded-lg">
            <div className="px-3 py-2">
                <textarea
                    rows={3}
                    className="w-full resize-none focus:outline-none"
                    placeholder="Viết tin nhắn..."
                    value={message}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t bg-gray-50">
                <div className="flex space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                        <Smile className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                        <Paperclip className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                        <Image className="h-5 w-5 text-gray-500" />
                    </button>
                </div>
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 flex items-center">
                    <Send className="h-4 w-4 mr-1" />
                    Gửi
                </button>
            </div>
        </div>
    )
}

const ChatWindow = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    // Sử dụng courseID và userID cố định cho demo, trong thực tế nên lấy từ prop hoặc context
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
        fetchMessages() // Fetch lại messages sau khi gửi
    }

    useEffect(() => {
        fetchMessages()
    }, []) // Chỉ fetch messages lần đầu tiên component được render

    return (
        <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)] flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-gray-500">Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.ForumMessageID}
                            className="flex"
                        >
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <UserCircle className="h-10 w-10 text-gray-500" />
                            </div>
                            <div className="ml-3 flex-1">
                                <div className="flex items-baseline">
                                    <span className="font-medium">{message.UserName}</span>
                                    {message.UserRole === 'Instructor' && (
                                        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                            Giảng viên
                                        </span>
                                    )}
                                    <span className="ml-2 text-sm text-gray-500">
                                        {DiscussionForumService.formatMessageTime(message.CreateAt)}
                                    </span>
                                </div>
                                <p className="text-gray-800 mt-1">{message.Content}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="p-4 border-t">
                <MessageInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    )
}

export default ChatWindow