import React, { useState, useEffect } from 'react';
import ChatFeed from './ChatFeed';
import LoginForm from './LoginForm';
import RoomCreation from './RoomCreation';
import './App.css';

const App = () => {
  const [user, setUser] = useState({
    username: localStorage.getItem('username') || '',
    roomId: '',
  });
  const [isInRoom, setIsInRoom] = useState(false);

  // Check URL for room ID on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get('roomId');
    
    if (roomId) {
      setUser(prevUser => ({
        ...prevUser,
        roomId
      }));
    }
  }, []);

  // Handle room joining
  const joinRoom = (roomId) => {
    setUser(prevUser => ({
      ...prevUser,
      roomId
    }));
    setIsInRoom(true);
  };

  // Handle room creation
  const createRoom = (roomId) => {
    setUser(prevUser => ({
      ...prevUser,
      roomId
    }));
    setIsInRoom(true);
  };

  // If no username, show login form
  if (!user.username) {
    return <LoginForm setUser={setUser} />;
  }

  // If not in a room, show room creation/joining options
  if (!isInRoom && !user.roomId) {
    return <RoomCreation username={user.username} onCreateRoom={createRoom} onJoinRoom={joinRoom} />;
  }

  // In a room, show chat feed
  return <ChatFeed user={user} roomId={user.roomId} />;
};

export default App;
