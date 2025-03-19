import React from 'react'
import ChatInterface from '../components/ui/chat/ChatInterface'

const ChatTest = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Trang Kiểm Tra Tính Năng Chat</h1>
            <div className="bg-white rounded-lg shadow-lg">
                <ChatInterface />
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Hướng dẫn sử dụng:</h2>
                <ol className="list-decimal pl-5 space-y-2">
                    <li>Nhập ID của bạn để đăng ký với máy chủ socket</li>
                    <li>Nhập ID người nhận để bắt đầu cuộc trò chuyện</li>
                    <li>Bạn có thể mở trang này trong hai cửa sổ trình duyệt khác nhau để kiểm tra tính năng chat</li>
                    <li>Nhập các ID khác nhau trong mỗi cửa sổ và gửi tin nhắn qua lại</li>
                </ol>
            </div>
        </div>
    )
}

export default ChatTest