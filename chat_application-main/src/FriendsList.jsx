import React, { useState, useEffect } from 'react';

const FriendsList = ({ onAddFriend, onSelectFriend }) => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'John', online: true },
    { id: 2, name: 'Sarah', online: false },
    { id: 3, name: 'Mike', online: true },
    { id: 4, name: 'Emma', online: true },
    { id: 5, name: 'Alex', online: true }
  ]);
  const [newFriendName, setNewFriendName] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  
  // Auto-select first friend on load
  useEffect(() => {
    if (friends.length > 0 && onSelectFriend) {
      onSelectFriend(friends[0]);
      setSelectedId(friends[0].id);
    }
  }, []);

  const handleAddFriend = () => {
    if (newFriendName.trim() === '') return;
    
    const newFriend = {
      id: friends.length + 1,
      name: newFriendName,
      online: true
    };
    
    setFriends([...friends, newFriend]);
    setNewFriendName('');
    
    if (onAddFriend) {
      onAddFriend(newFriend);
    }
  };

  const handleSelectFriend = (friend) => {
    if (onSelectFriend) {
      onSelectFriend(friend);
      setSelectedId(friend.id);
    }
  };

  return (
    <div className="friends-list">
      <div className="friends-list-header">
        <h3>Friends</h3>
      </div>
      <div className="friends-list-content">
        {friends.map((friend) => (
          <div 
            key={friend.id} 
            className={`friend-item ${selectedId === friend.id ? 'selected' : ''}`}
            onClick={() => handleSelectFriend(friend)}
          >
            <div className={`status-indicator ${friend.online ? 'online' : 'offline'}`}></div>
            <div className="friend-name">{friend.name}</div>
          </div>
        ))}
      </div>
      <div className="add-friend-form">
        <input
          type="text"
          placeholder="Add a friend..."
          value={newFriendName}
          onChange={(e) => setNewFriendName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddFriend()}
        />
        <button onClick={handleAddFriend}>Add</button>
      </div>
    </div>
  );
};

export default FriendsList;