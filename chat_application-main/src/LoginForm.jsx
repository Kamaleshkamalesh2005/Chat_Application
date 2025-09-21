import React, { useState, useEffect } from 'react';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return setError('Enter a username');

    localStorage.setItem('username', username);
    setUser({ username });
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        {error && <h1 className="error">{error}</h1>}
      </div>
    </div>
  );
};

export default LoginForm;
