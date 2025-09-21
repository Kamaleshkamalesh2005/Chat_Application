import React, { useState } from 'react';

const ShareLink = ({ username, roomId }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate a shareable link with the current room ID
  const generateShareableLink = () => {
    return `${window.location.origin}?roomId=${roomId}&username=${username}`;
  };

  // Copy link to clipboard
  const copyToClipboard = () => {
    const link = generateShareableLink();
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
    <div className="share-link-container">
      <div className="share-link-title">Share Room Link</div>
      <div className="share-link-content">
        <input 
          type="text" 
          className="share-link-input" 
          value={generateShareableLink()} 
          readOnly 
        />
        <button 
          className="copy-link-button" 
          onClick={copyToClipboard}
        >
          {copySuccess ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="share-link-instructions">
        Share this link with friends to join this room
      </div>
    </div>
  );
};

export default ShareLink;