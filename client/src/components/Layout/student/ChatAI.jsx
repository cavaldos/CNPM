import React, { useState, useRef, useEffect } from "react";
import PublicService from "../../../services/public.service";

const ChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      isUser: false,
      text: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = {
      isUser: true,
      text: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Call AI service
      const response = await PublicService.ai.chatWithGroq(inputMessage);

      if (response && response.data && response.data.result) {
        // Add AI response to chat
        const aiResponse = {
          isUser: false,
          text: response.data.result,
          timestamp: new Date().toISOString()
        };

        setMessages(prevMessages => [...prevMessages, aiResponse]);
      } else {
        // Handle error response
        const errorResponse = {
          isUser: false,
          text: "Xin lỗi, tôi không thể xử lý yêu cầu của bạn. Vui lòng thử lại sau.",
          timestamp: new Date().toISOString()
        };

        setMessages(prevMessages => [...prevMessages, errorResponse]);
      }
    } catch (error) {
      console.error("Error calling AI service:", error);

      // Add error message to chat
      const errorMessage = {
        isUser: false,
        text: "Đã xảy ra lỗi khi kết nối với dịch vụ AI. Vui lòng thử lại sau.",
        timestamp: new Date().toISOString()
      };

      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ease-in-out ${isOpen ? 'w-96 md:w-[450px] h-[550px]' : 'w-16 h-16'}`}>
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl flex flex-col h-full overflow-hidden transition-all duration-300">
          <div className="chatAI__header bg-gradient-to-r from-blue-600 to-blue-500 text-white p-2 flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="font-bold text-lg">Chat</h1>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors p-1 hover:bg-blue-700 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="chatAI__body flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="chatAI__body__messages space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`chatAI__body__messages__message flex ${message.isUser ? 'justify-end' : ''}`}>
                  <div
                    className={`chatAI__body__messages__message__text p-3 rounded-2xl max-w-[85%] shadow-sm ${message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none'
                      }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <div className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="chatAI__body__messages__message flex">
                  <div className="chatAI__body__messages__message__text bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
                    <div className="flex items-center space-x-1 px-2">
                      <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></span>
                      <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                      <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="chatAI__footer p-4 bg-white shadow-inner">
            <form className="flex" onSubmit={handleSubmit}>
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Nhập tin nhắn của bạn"
                className="flex-1 border-0 bg-gray-100 rounded-l-full px-4 py-3 focus:outline-none focus:ring-0 focus:shadow-inner focus:bg-white transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`${isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'} text-white px-5 py-3 rounded-r-full transition-all duration-200 flex items-center justify-center`}
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatAI;