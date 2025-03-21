import React, { useState, useRef, useEffect } from 'react'
import { SendIcon, PaperclipIcon, SmileIcon } from 'lucide-react'
import useChatSocket from '../../../hooks/useChatSocket'

const SimpleChat = () => {
    const [senderId, setSenderId] = useState('')
    const [receiverId, setReceiverId] = useState('')
    const [message, setMessage] = useState('')
    const [chatMessages, setChatMessages] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const messagesEndRef = useRef(null)

    // Only initialize useChatSocket when we have a senderId
    const { privateMessages, sendPrivateMessage } = useChatSocket(isAuthenticated ? senderId : null)

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom()
    }, [chatMessages])

    // Update our local messages when privateMessages change
    useEffect(() => {
        if (privateMessages.length > 0) {
            setChatMessages(prev => {
                // Filter out duplicates by creating a map with message IDs
                const messagesMap = new Map()

                // Add existing messages
                prev.forEach(msg => {
                    const key = msg.id || `${msg.senderId}-${msg.timestamp}`
                    messagesMap.set(key, msg)
                })

                // Add new messages
                privateMessages.forEach(msg => {
                    const key = msg.id || `${msg.senderId}-${msg.timestamp}`
                    if (!messagesMap.has(key)) {
                        messagesMap.set(key, msg)
                    }
                })

                return Array.from(messagesMap.values())
                    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            })
        }
    }, [privateMessages])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (senderId.trim()) {
            setIsAuthenticated(true)
        }
    }

    const handleSendMessage = (e) => {
        e.preventDefault()

        if (message.trim() && receiverId.trim()) {
            const newMessage = {
                content: message,
                senderId: senderId,
                receiverId: receiverId,
                timestamp: new Date(),
                id: `local-${Date.now()}`
            }

            // Add to local messages immediately for UI feedback
            setChatMessages(prev => [...prev, newMessage])

            // Send via socket
            sendPrivateMessage(message, receiverId)

            // Clear message input
            setMessage('')
        }
    }

    const formatTime = (timestamp) => {
        if (!timestamp) return ''
        const date = new Date(timestamp)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Đăng nhập để trò chuyện</h2>
                <form onSubmit={handleLogin} className="w-full max-w-sm">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senderId">
                            ID của bạn
                        </label>
                        <input
                            id="senderId"
                            type="text"
                            value={senderId}
                            onChange={(e) => setSenderId(e.target.value)}
                            placeholder="Nhập ID của bạn"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Bắt đầu trò chuyện
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-[70vh] bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-semibold">Trò chuyện trực tiếp</h2>
                        <p className="text-sm opacity-90">ID của bạn: {senderId}</p>
                    </div>
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
                        <span>Đang kết nối</span>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-100">
                <div className="flex">
                    <input
                        type="text"
                        value={receiverId}
                        onChange={(e) => setReceiverId(e.target.value)}
                        placeholder="Nhập ID người nhận"
                        className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                        onClick={() => setReceiverId(receiverId.trim())}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {chatMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">
                            {receiverId ? 'Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện' : 'Nhập ID người nhận để bắt đầu'}
                        </p>
                    </div>
                ) : (
                    chatMessages.map((msg, index) => (
                        <div
                            key={msg.id || index}
                            className={`flex ${msg.senderId === senderId ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] rounded-lg p-3 ${msg.senderId === senderId
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                                    }`}
                            >
                                <p className="break-words">{msg.content}</p>
                                <div
                                    className={`text-xs mt-1 ${msg.senderId === senderId ? 'text-blue-100' : 'text-gray-500'
                                        }`}
                                >
                                    {formatTime(msg.timestamp)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 bg-white p-4">
                <form onSubmit={handleSendMessage} className="flex items-center">
                    <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                        <PaperclipIcon size={20} />
                    </button>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        disabled={!receiverId}
                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 mx-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 mr-2"
                    >
                        <SmileIcon size={20} />
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={!message.trim() || !receiverId}
                    >
                        <SendIcon size={20} />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SimpleChat