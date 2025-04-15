import React, { useEffect, useState, useRef } from 'react';
import { SendIcon, PaperclipIcon, SmileIcon } from 'lucide-react';

const ChatWindow = ({ contact, messages, onSendMessage, currentUserId }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = e => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const formatTimestamp = timestamp => {
    if (!timestamp) return '';

    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="border-b border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {contact.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>
          <div className="ml-3">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-xs text-gray-500">
              {contact.online ? 'Đang hoạt động' : 'Không hoạt động'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => {
          // Cải thiện cách xác định người gửi tin nhắn
          // So sánh ID có dạng chuỗi để tránh lỗi khi so sánh số và chuỗi
          const isCurrentUser =
            String(message.sender) === String(currentUserId) ||
            String(message.senderId) === String(currentUserId);

          return (
            <div
              key={message._id || message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              {/* Hiển thị avatar cho tin nhắn của người khác (bên trái) */}
              {!isCurrentUser && (
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-8 h-8 rounded-full object-cover mr-2 self-end"
                />
              )}

              {/* Nội dung tin nhắn - style khác nhau dựa trên người gửi */}
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  isCurrentUser
                    ? 'bg-blue-600 text-white rounded-br-none ml-auto'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p>{message.content || message.text}</p>
                <div
                  className={`text-xs mt-1 ${isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}
                >
                  {formatTimestamp(message.createdAt) || message.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-200 bg-white p-4">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <button type="button" className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
            <PaperclipIcon size={20} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="button" className="p-2 rounded-full hover:bg-gray-100 text-gray-500 mr-2">
            <SmileIcon size={20} />
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
            disabled={!newMessage.trim()}
          >
            <SendIcon size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
