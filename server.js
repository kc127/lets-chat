/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: 'http://localhost:5001',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());

/* serve static folder */
app.use(express.static(path.join(__dirname, '/public')));

/* run when client connects */
io.on('connection', (socket) => {
  socket.emit('me', socket.id);

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  socket.on('callUser', (data) => {
    io.to(data.userToCall).emit('callUser', { signal: data.signalData, from: data.from, name: data.name });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Server is running.');
});

server.listen(PORT, () => {
  console.log(`Server listening in ${PORT}`);
});
