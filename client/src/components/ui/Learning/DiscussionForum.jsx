import React from 'react'

import { Smile, Paperclip, Image, Send, UserCircle } from 'lucide-react'
const MessageInput = () => {
    return (
        <div className="border rounded-lg">
            <div className="px-3 py-2">
                <textarea
                    rows={3}
                    className="w-full resize-none focus:outline-none"
                    placeholder="Viết tin nhắn..."
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
                <button className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 flex items-center">
                    <Send className="h-4 w-4 mr-1" />
                    Gửi
                </button>
            </div>
        </div>
    )
}

const messages = [
    {
        id: 1,
        user: {
            name: 'GS. Nguyễn Văn A',
            role: 'instructor',
            avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random',
        },
        content:
            'Chào các em. Hôm nay chúng ta sẽ thảo luận về gradient descent trong machine learning nhé.',
        timestamp: '10:30',
    },
    {
        id: 2,
        user: {
            name: 'Trần Thị B',
            role: 'student',
            avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+B&background=random',
        },
        content:
            'Em không hiểu phần learning rate ạ. Làm sao để chọn giá trị phù hợp?',
        timestamp: '10:32',
    },
    {
        id: 3,
        user: {
            name: 'GS. Nguyễn Văn A',
            role: 'instructor',
            avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random',
        },
        content:
            'Learning rate là một hyperparameter quan trọng. Nếu chọn quá lớn, thuật toán có thể không hội tụ. Nếu quá nhỏ, thuật toán sẽ hội tụ chậm.',
        timestamp: '10:35',
    },
]

const ChatWindow = () => {

    return (
        <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)] flex flex-col">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">
                    Câu hỏi về bài tập Machine Learning tuần 3
                </h2>
                <p className="text-sm text-gray-500">24 thành viên tham gia</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className="flex"
                    >
                        <img
                            src={message.user.avatar}
                            alt={message.user.name}
                            className="h-10 w-10 rounded-full"
                        />
                        <div className="ml-3 flex-1">
                            <div className="flex items-baseline">
                                <span className="font-medium">{message.user.name}</span>
                                {message.user.role === 'instructor' && (
                                    <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                                        Giảng viên
                                    </span>
                                )}
                                <span className="ml-2 text-sm text-gray-500">
                                    {message.timestamp}
                                </span>
                            </div>
                            <p className="text-gray-800 mt-1">{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t">
                <MessageInput />
            </div>
        </div>
    )
}

export default ChatWindow