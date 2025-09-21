import React, { useState, useEffect } from 'react';
import MessageForm from './MessageForm';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import ShareLink from './ShareLink';

const ChatFeed = ({ user, roomId }) => {
  const [messages, setMessages] = useState([]);
  const [roomUsers, setRoomUsers] = useState([]);
  
  // Initialize room with current user only
  useEffect(() => {
    if (!roomUsers.includes(user.username)) {
      setRoomUsers(prev => [...prev, user.username]);
    }
    
    // Add welcome message
    setMessages([{
      system: true,
      text: `Welcome to room ${roomId}`,
      timestamp: new Date().toISOString()
    }]);
    
    // Listen for new users joining via URL parameters
    const checkForNewUsers = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const joinUsername = urlParams.get('username');
      
      if (joinUsername && joinUsername !== user.username && !roomUsers.includes(joinUsername)) {
        setRoomUsers(prev => [...prev, joinUsername]);
        
        // Add system message about user joining
        setMessages(prev => [...prev, {
          system: true,
          text: `${joinUsername} has joined the room`,
          timestamp: new Date().toISOString()
        }]);
      }
    };
    
    // Check for new users when the component mounts
    checkForNewUsers();
    
    // Set up event listener for URL changes
    window.addEventListener('popstate', checkForNewUsers);
    
    return () => {
      window.removeEventListener('popstate', checkForNewUsers);
    };
  }, []);
  
  const handleSendMessage = (message) => {
    // Add timestamp to message
    const messageWithTimestamp = {
      ...message,
      timestamp: new Date().toISOString()
    };
    
    // Add the new message to our local state
    setMessages(prev => [...prev, messageWithTimestamp]);
    
    // In a real application, this would broadcast the message to other users
    // For now, we'll just display the message locally
  };
  
  // Format timestamp to a readable format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Render a message based on its sender
  const renderMessage = (message, index) => {
    // System messages
    if (message.system) {
      return (
        <div key={index} className="system-message">
          <div className="message-content">{message.text}</div>
          <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
        </div>
      );
    }
    
    const isMyMessage = message.user === user.username;
    
    if (isMyMessage) {
      return (
        <MyMessage 
          key={index} 
          message={message} 
          timestamp={formatTimestamp(message.timestamp)}
        />
      );
    }
    
    return (
      <TheirMessage 
        key={index} 
        message={message} 
        timestamp={formatTimestamp(message.timestamp)}
      />
    );
  };
  
  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">
          <h1>Room: {roomId}</h1>
          <div className="room-users">
            {roomUsers.map((username, index) => (
              <span key={index} className="room-user-badge">
                {username}
              </span>
            ))}
          </div>
        </div>
        <ShareLink username={user.username} roomId={roomId} />
      </div>
      
      <div className="messages-container">
        {messages.map((message, index) => renderMessage(message, index))}
        <div style={{ flexGrow: 1 }}></div>
      </div>
      
      <div className="message-divider">
        <span>Message Input</span>
      </div>
      
      <div className="message-form-container">
        <MessageForm user={user} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatFeed;
