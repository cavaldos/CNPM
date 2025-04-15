import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:5004');

const useChatSocket = userId => {
  const [received, setReceived] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (userId) {
      // Thay đổi 'register' thành 'initialize' để phù hợp với socket server
      socket.emit('initialize', { id: userId });
    }

    socket.on('receive', data => {
      setReceived(true);

      // Tăng biến count nếu server gửi yêu cầu tăng
      if (data && data.incrementCount) {
        setCount(prevCount => prevCount + 1);
      }

      // Tự động reset sau một khoảng thời gian
      setTimeout(() => {
        setReceived(false);
      }, 5000);
    });

    return () => {
      socket.off('receive');
    };
  }, [userId]);

  const send = receiverId => {
    if (userId && receiverId) {
      // Thay đổi cấu trúc data để phù hợp với socket server
      const data = {
        recipientId: receiverId,
      };
      socket.emit('send', data);
      return true;
    }
    return false;
  };

  return {
    received,
    setReceived,
    send,
    count,
  };
};

export default useChatSocket;
