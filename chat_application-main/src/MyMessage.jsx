import React from 'react';

const MyMessage = ({ message, timestamp }) => {
  return (
    <div className="message-row my-message-row">
      <div className="my-message">
        <div className="message-content">{message.text}</div>
        <div className="message-info">
          <span className="message-sender">You</span>
          <span className="message-timestamp">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default MyMessage;
