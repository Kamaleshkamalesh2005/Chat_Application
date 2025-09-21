import React, { useState } from 'react';

const RoomCreation = ({ username, onCreateRoom, onJoinRoom }) => {
  const [roomIdToJoin, setRoomIdToJoin] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate a unique room ID
  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  // Create a new room and generate a shareable link
  const handleCreateRoom = () => {
    const newRoomId = generateRoomId();
    onCreateRoom(newRoomId);
  };

  // Join an existing room
  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomIdToJoin.trim()) {
      onJoinRoom(roomIdToJoin);
    }
  };

  // Generate a shareable link for the room
  const generateShareableLink = (roomId) => {
    return `${window.location.origin}?roomId=${roomId}`;
  };

  // Copy room link to clipboard
  const copyToClipboard = (roomId) => {
    const link = generateShareableLink(roomId);
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };

  return (
    <div className="room-creation-container">
      <div className="room-creation-header">
        <h2>Hello, Kamal!</h2>
        <p>Welcome to your personalized Real-Time Chat experience. Create a new chat room or join an existing one.</p>
      </div>

      <div className="room-options">
        <div className="create-room-section">
          <h3>Create a New Room</h3>
          <p>Create a new chat room and invite others to join you.</p>
          <button 
            className="create-room-button"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
        </div>

        <div className="join-room-section">
          <h3>Join an Existing Room</h3>
          <p>Enter a room ID to join an existing chat room.</p>
          <form onSubmit={handleJoinRoom} className="join-room-form">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomIdToJoin}
              onChange={(e) => setRoomIdToJoin(e.target.value)}
              className="room-id-input"
            />
            <button type="submit" className="join-room-button">
              Join Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoomCreation;