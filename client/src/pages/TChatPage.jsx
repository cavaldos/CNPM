import React, { useState } from 'react';
import useChatSocket from '~/hooks/useChatSocket';

const TestChatPage = () => {
  const [userId, setUserId] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  // Sử dụng hook chỉ khi đã kết nối
  const { send, received, count } = useChatSocket(isConnected ? userId : null);

  // Kết nối tới socket
  const handleConnect = () => {
    if (userId.trim()) {
      setIsConnected(true);
    }
  };

  // Ngắt kết nối
  const handleDisconnect = () => {
    setIsConnected(false);
  };

  // Gửi tín hiệu đến người nhận
  const handleSend = () => {
    if (isConnected && receiverId.trim()) {
      send(receiverId);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Test Chat Page</h1>
      <div className="mb-4 text-center">
        <span className="text-lg font-semibold">Số lần nhận tín hiệu: {count}</span>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">ID của bạn:</label>
        <div className="flex">
          <input
            type="text"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            disabled={isConnected}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l focus:outline-none"
            placeholder="Nhập ID của bạn"
          />
          {!isConnected ? (
            <button
              onClick={handleConnect}
              disabled={!userId.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 disabled:bg-gray-400"
            >
              Kết nối
            </button>
          ) : (
            <button
              onClick={handleDisconnect}
              className="bg-red-500 text-white px-4 py-2 rounded-r hover:bg-red-600"
            >
              Ngắt kết nối
            </button>
          )}
        </div>
      </div>

      {isConnected && (
        <>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">ID người nhận:</label>
            <input
              type="text"
              value={receiverId}
              onChange={e => setReceiverId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
              placeholder="Nhập ID người nhận"
            />
          </div>

          <div className="mb-6">
            <button
              onClick={handleSend}
              disabled={!receiverId.trim()}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              Gửi tín hiệu
            </button>
          </div>
        </>
      )}

      {received && (
        <div className="p-4 rounded mt-6 text-center font-bold bg-yellow-100 text-yellow-800">
          <p>Đã nhận tín hiệu!</p>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        {isConnected ? (
          <p>
            Đã kết nối với ID: <span className="font-bold">{userId}</span>
          </p>
        ) : (
          <p>Chưa kết nối</p>
        )}
      </div>
    </div>
  );
};

export default TestChatPage;
