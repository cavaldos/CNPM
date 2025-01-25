import React, { useState } from "react";
import { MdClose, MdOpenInFull } from "react-icons/md";


const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-blue-600 text-gray-300">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-white rounded-full"></div>
        <h1 className="text-lg font-bold">Chat Apps</h1>
      </div>
      <div className="w-8 h-8 bg-white rounded-full"></div>
    </div>
  );
};

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-4 flex ${
            message.sender === "me" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-4 rounded-lg ${
              message.sender === "me"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 bg-white">
      <input
        type="text"
        className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="p-2 bg-blue-600 text-white rounded-r-lg">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 12l19-9-9 19-2-8-8-2z" />
        </svg>
      </button>
    </form>
  );
};

const UserList = ({ users, onSelectUser }) => {
  return (
    <div className="w-[80px] bg-gray-700 p-2 overflow-y-auto">
      {users.map((user) => (
        <div
          key={user.id}
          className="cursor-pointer mb-2"
          onClick={() => onSelectUser(user)}
          title={user.name}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full mx-auto"
          />
        </div>
      ))}
    </div>
  );
};

const ChatBox = ({ messages, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-2 bg-gray-500 rounded-t-lg">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 ${message.isOwn ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                message.isOwn
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-2 p-2 bg-gray-500 rounded-b-lg">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};



const FloatingComponent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([
    // Sample messages
    { text: "Hello!", isOwn: false },
    { text: "Hi, how are you?", isOwn: true },
  ]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const users = [
    { id: 1, name: "User 1", avatar: "https://via.placeholder.com/40" },
    { id: 2, name: "User 2", avatar: "https://via.placeholder.com/40" },
    { id: 3, name: "User 3", avatar: "https://via.placeholder.com/40" },
    // Add more users as needed
  ];

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isOwn: true }]);
  };

  return (
    <>
      <div
        className={`fixed bottom-0 right-0 w-[700px] h-[600px] bg-gray-300 text-white p-2 m-2 rounded-md shadow-lg z-50 transition-all duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <span>Always on Top Component</span>
          <button onClick={toggleVisibility} className="text-white">
            <MdClose size={24} className="text-black" />
          </button>
        </div>

        <div className="flex h-[calc(100%-2rem)] bg-blue">
          <UserList users={users} onSelectUser={setSelectedUser} />
          <div className="flex-1 bg-white text-black p-2 rounded-lg ml-2 flex flex-col">
            {selectedUser ? (
              <div className="flex-1 flex flex-col">
                <h2>{selectedUser.name}</h2>
                <ChatBox
                  messages={messages}
                  onSendMessage={handleSendMessage}
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                Select a user to start a conversation
              </div>
            )}
          </div>
        </div>
      </div>
      {!isVisible && (
        <button
          onClick={toggleVisibility}
          className="fixed bottom-4 right-4 bg-black text-white p-2 rounded-full shadow-lg z-50"
        >
          <MdOpenInFull size={24} />
        </button>
      )} 
    </>
  );
};


const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey, how's your day going?", sender: "me" },
    {
      id: 2,
      text: "Not toosa asdfkj a fh dsaghhasdhgkasdf  khagf asdkjgfha khsdf kashg aksjdfh  bad, jusadfst a bit busy. How abouas dfasdf sdfaadfg   dsfads  asdfasd asdf t you?",
      sender: "other",
    },
    {
      id: 3,
      text: "I'm good, thanks. Anything exciting happening?",
      sender: "me",
    },
    {
      id: 4,
      text: "Not really, just the usual. Work and errands.",
      sender: "other",
    },
    {
      id: 5,
      text: "Sounds like a typical day. Got any plans for the weekend?",
      sender: "me",
    },
    {
      id: 6,
      text: "Not yet, I'm hoping to relax and maybe catch up on some reading. How about you?",
      sender: "other",
    },
    {
      id: 7,
      text: "I might go hiking if the weather's nice. Otherwise, just taking it easy",
      sender: "me",
    },
  ]);

  const handleSendMessage = (message) => {
    setMessages([
      ...messages,
      { id: messages.length + 1, text: message, sender: "me" },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 w-[500px]">
      {/* <FloatingComponent /> */}
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatApp;
