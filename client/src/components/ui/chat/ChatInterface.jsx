import React, { useState } from 'react'
import ContactsList from './ContactList'
import ChatWindow from './ChatWindow'
import SimpleChat from './SimpleChat'
import { MessageCircleIcon } from 'lucide-react'

// Mock data types
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
    {
        id: '2',
        name: 'Trần Thị B',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        online: true,
        lastMessage: 'Hôm nay mình họp lúc mấy giờ?',
        lastMessageTime: '9:15 AM',
        unreadCount: 0,
    },
    {
        id: '3',
        name: 'Lê Văn C',
        avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        online: false,
        lastMessage: 'Tài liệu đã gửi cho bạn rồi nhé',
        lastMessageTime: 'Yesterday',
        unreadCount: 0,
    },
    {
        id: '4',
        name: 'Phạm Thị D',
        avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        online: false,
        lastMessage: 'Cảm ơn bạn nhiều!',
        lastMessageTime: 'Yesterday',
        unreadCount: 0,
    },
    {
        id: '5',
        name: 'Hoàng Văn E',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        online: true,
        lastMessage: 'Hẹn gặp lại vào ngày mai',
        lastMessageTime: 'Monday',
        unreadCount: 1,
    },
]

// Mock conversation data
const mockConversations = {
    '1': [
        {
            id: 'm1',
            senderId: '1',
            text: 'Chào bạn, bạn khỏe không?',
            timestamp: '10:25 AM',
            isRead: true,
        },
        {
            id: 'm2',
            senderId: 'me',
            text: 'Chào, mình khỏe, còn bạn?',
            timestamp: '10:26 AM',
            isRead: true,
        },
        {
            id: 'm3',
            senderId: '1',
            text: 'Mình cũng vậy. Bạn đang làm gì đó?',
            timestamp: '10:28 AM',
            isRead: true,
        },
        {
            id: 'm4',
            senderId: 'me',
            text: 'Mình đang làm việc trên một dự án mới',
            timestamp: '10:29 AM',
            isRead: true,
        },
        {
            id: 'm5',
            senderId: '1',
            text: 'Bạn khỏe không?',
            timestamp: '10:30 AM',
            isRead: false,
        },
    ],
    '2': [
        {
            id: 'm1',
            senderId: '2',
            text: 'Chào bạn, hôm nay mình họp lúc mấy giờ?',
            timestamp: '9:15 AM',
            isRead: true,
        },
    ],
    '3': [
        {
            id: 'm1',
            senderId: '3',
            text: 'Tài liệu đã gửi cho bạn rồi nhé',
            timestamp: 'Yesterday',
            isRead: true,
        },
    ],
    '4': [
        {
            id: 'm1',
            senderId: 'me',
            text: 'Cảm ơn bạn đã giúp đỡ!',
            timestamp: 'Yesterday',
            isRead: true,
        },
        {
            id: 'm2',
            senderId: '4',
            text: 'Cảm ơn bạn nhiều!',
            timestamp: 'Yesterday',
            isRead: true,
        },
    ],
    '5': [
        {
            id: 'm1',
            senderId: '5',
            text: 'Hẹn gặp lại vào ngày mai',
            timestamp: 'Monday',
            isRead: false,
        },
    ],
}

const ChatInterface = () => {
    const [selectedContact, setSelectedContact] = useState(mockContacts[0])
    const [messages, setMessages] = useState(mockConversations[mockContacts[0].id])
    const [activeChatType, setActiveChatType] = useState('simple') // 'simple' or 'contacts'

    const handleContactSelect = (contact) => {
        setSelectedContact(contact)
        setMessages(mockConversations[contact.id] || [])
    }

    const handleSendMessage = (text) => {
        if (!selectedContact) return
        const newMessage = {
            id: `new-${Date.now()}`,
            senderId: 'me',
            text,
            timestamp: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            isRead: false,
        }
        setMessages((prev) => [...prev, newMessage])
    }

    const toggleChatType = () => {
        setActiveChatType(activeChatType === 'simple' ? 'contacts' : 'simple')
    }

    return (
        <div className="flex flex-col h-[80vh] bg-white">
            <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
                <h1 className="text-xl font-bold">Hệ thống tin nhắn</h1>
                <div>
                    <button
                        onClick={toggleChatType}
                        className="bg-white text-blue-600 px-4 py-1 rounded-md text-sm font-medium hover:bg-blue-50"
                    >
                        {activeChatType === 'simple' ? 'Chuyển sang danh bạ' : 'Chuyển sang nhắn trực tiếp'}
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {activeChatType === 'simple' ? (
                    <SimpleChat />
                ) : (
                    <>
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
                            />
                        ) : (
                            <div className="flex-1 flex items-center justify-center bg-gray-50">
                                <p className="text-gray-500">
                                    Chọn một liên hệ để bắt đầu trò chuyện
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default ChatInterface
