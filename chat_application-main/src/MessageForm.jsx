import React, { useState } from 'react';

const MessageForm = ({ user, onSendMessage }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;

    // Send message directly to parent component
    onSendMessage({
      user: user.username,
      text: value,
    });

    setValue('');
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default MessageForm;
