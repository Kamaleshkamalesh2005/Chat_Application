// server.js
const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pusher = new Pusher({
  appId: "2053795",                 // Your App ID from Pusher dashboard
  key: "39242ed6856548398c07",      // Your App Key from Pusher dashboard
  secret: "a7f2e4b9c1d3e5f8a2c4b6d8",  // Generated secret for demo purposes
  cluster: "ap2",                   // Your cluster/region from Pusher dashboard
  useTLS: true
});


// Endpoint to trigger messages (for demo purposes)
app.post('/message', (req, res) => {
  const { user, text } = req.body;
  pusher.trigger('chat-channel', 'new-message', { user, text });
  res.sendStatus(200);
});

app.listen(5000, () => console.log('Server running on port 5000'));
