// routes/salesWebSocket.js
const { Server } = require('ws');

const wss = new Server({ noServer: true });

wss.on('connection', (socket) => {
  console.log('A user connected to the /sales WebSocket');

  // You can handle WebSocket events specific to /sales here
  socket.on('message', (message) => {
    console.log('Received message from client:', message);
    // Handle the message as needed
  });

  socket.on('close', () => {
    console.log('A user disconnected from the /sales WebSocket');
  });
});

module.exports = wss;
