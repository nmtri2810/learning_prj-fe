'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SystemMessage = {
  id: 1,
  body: 'Welcome to the Nest Chat app',
  user: {
    id: 1,
    email: 'bot@gmail.com',
  },
};

const currentUser = {
  id: 1,
  email: 'guest@gmail.com',
};

// create a new socket instance with localhost URL
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
  autoConnect: false,
});

export default function Chat() {
  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState([SystemMessage]);

  const handleSendMessage = (e: { key: string }) => {
    if (e.key !== 'Enter' || inputValue.trim().length === 0) return;

    socket.emit('chat', { user: currentUser, body: inputValue.trim() });
    setInputValue('');
  };

  const handleLogout = () => {
    socket.disconnect(); // disconnect when we do logout
  };

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => console.log('Socket connected'));
    socket.on('disconnect', () => console.log('Socket disconnected'));

    // listen chat event messages
    socket.on('chat', (newMessage) => {
      console.log('New message added', newMessage);
      setMessages((previousMessages) => [...previousMessages, newMessage]);
    });

    // remove all event listeners
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('chat');
    };
  }, []);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {messages.map((message, id) => (
          <div key={id} className='space-x-4'>
            <span>{message.user.email}</span>
            <span>{message.body}</span>
          </div>
        ))}
      </div>
      <input
        placeholder='Type message here'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleSendMessage}
      />
    </div>
  );
}
