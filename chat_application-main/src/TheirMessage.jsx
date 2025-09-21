import React from 'react';

const TheirMessage = ({ message, timestamp }) => {
  return (
    <div className="message-row their-message-row">
      <div className="their-message">
        <div className="message-content">{message.text}</div>
        <div className="message-info">
          <span className="message-sender">{message.user}</span>
          <span className="message-timestamp">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default TheirMessage;
