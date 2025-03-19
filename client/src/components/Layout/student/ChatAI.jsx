import React, { useState } from "react";

const ChatAI = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 ${isOpen ? 'w-80 h-96' : 'w-16 h-16'}`}>
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-full border border-gray-200">
          <div className="chatAI__header bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h1 className="font-bold">ChatAI</h1>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="chatAI__body flex-1 p-3 overflow-y-auto">
            <div className="chatAI__body__messages space-y-3">
              <div className="chatAI__body__messages__message flex">
                <div className="chatAI__body__messages__message__user mr-2">
                  <img src="https://i.imgur.com/2K6b64C.png" alt="user" className="w-8 h-8 rounded-full" />
                </div>
                <div className="chatAI__body__messages__message__text bg-gray-100 p-2 rounded-lg">
                  <p>Hello! How can I help you today?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="chatAI__footer p-3 border-t">
            <form className="flex">
              <input 
                type="text" 
                placeholder="Type your message" 
                className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button 
          onClick={toggleChat} 
          className="w-full h-full bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700"
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