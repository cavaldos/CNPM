import React, { useEffect, useState } from 'react'
import ContactsList from './ContactList'
import ChatWindow from './ChatWindow'
import ChatService from '../../../services/chat/chat.service'

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

]

const ChatInterface = () => {
    const [selectedContact, setSelectedContact] = useState(mockContacts[0])
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // ID của người dùng hiện tại - sau này nên lấy từ context hoặc redux
    const currentUserId = 1

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedContact) return

            setLoading(true)
            setError(null)

            try {
                const receiverId = selectedContact.id
                const response = await ChatService.getConversation(currentUserId, 4)

                if (response && response.data) {
                    setMessages(response.data)
                }



            } catch (err) {
                console.error('Error fetching messages:', err)
                setError('Không thể tải tin nhắn. Vui lòng thử lại sau.')
            } finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [selectedContact])

    const handleContactSelect = (contact) => {
        setSelectedContact(contact)
    }

    const handleSendMessage = async (text) => {
        if (!selectedContact || !text.trim()) return

        try {
            // Hiển thị tin nhắn tạm thời ngay lập tức để UX tốt hơn
            const tempMessage = {
                _id: `temp-${Date.now()}`,
                sender: currentUserId,
                receiver: selectedContact.id,
                content: text,
                createdAt: new Date().toISOString(),
                isRead: false
            }

            setMessages(prev => [...prev, tempMessage])

            // Gửi tin nhắn đến API
            const response = await ChatService.sendMessage(
                currentUserId,
                selectedContact.id,
                text
            )

            // Cập nhật tin nhắn với dữ liệu thực từ API
            if (response && response.data) {
                setMessages(prev =>
                    prev.map(msg =>
                        msg._id === tempMessage._id ? response.data : msg
                    )
                )
            }

            // Cập nhật lastMessage trong danh sách liên hệ (trong ứng dụng thực tế)
            // updateContactLastMessage(selectedContact.id, text)
        } catch (err) {
            console.error('Error sending message:', err)
            // Xử lý lỗi - có thể hiển thị thông báo hoặc đánh dấu tin nhắn lỗi
        }
    }

    return (
        <div className="flex flex-col h-[80vh] bg-white">
            {error && (
                <div className="bg-red-100 text-red-700 p-2 text-center">
                    {error}
                </div>
            )}
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
                        <p className="text-gray-500">
                            Chọn một liên hệ để bắt đầu trò chuyện
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatInterface
