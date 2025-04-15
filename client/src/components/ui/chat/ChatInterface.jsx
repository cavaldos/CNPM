import React, { useEffect, useState } from 'react';
import ContactsList from './ContactList';
import ChatWindow from './ChatWindow';
import ChatService from '../../../services/chat/chat.service';
// Giữ lại mockContacts để hiển thị danh sách liên hệ (có thể thay đổi sau này)
const mockContacts = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    online: true,
    lastMessage: 'Bạn khỏe không?',
    lastMessageTime: '10:30 AM',
    unreadCount: 2,
  },
];

const ChatInterface = () => {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ID của người dùng hiện tại - sau này nên lấy từ context hoặc redux
  const currentUserId = 1;
  const fetchMessages = async () => {
    if (!selectedContact) return;

    setLoading(true);
    setError(null);
    try {
      const receiverId = selectedContact.id;
      const response = await ChatService.getConversation(currentUserId, 4);

      if (response && response.data) {
        setMessages(response.data);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Không thể tải tin nhắn. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedContact]);

  const handleContactSelect = contact => {
    setSelectedContact(contact);
  };

  const handleSendMessage = async text => {
    if (!selectedContact || !text.trim()) return;

    try {
      await ChatService.sendMessage(1, 4, text);
      await fetchMessages();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-white">
      {error && <div className="bg-red-100 text-red-700 p-2 text-center">{error}</div>}
      <div className="flex flex-1 overflow-hidden">
        <ContactsList
          contacts={mockContacts}
          selectedContactId={selectedContact?.id || ''}
          onSelectContact={handleContactSelect}
        />
        {selectedContact ? (
          <ChatWindow
            contact={selectedContact}
            messages={messages}
            onSendMessage={handleSendMessage}
            currentUserId={currentUserId}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <p className="text-gray-500">Chọn một liên hệ để bắt đầu trò chuyện</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
