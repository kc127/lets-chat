/* eslint-disable no-console */
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', '/public')));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Server is running.');
});

io.on('connection')

server.listen(PORT, () => {
  console.log(`Server listening in ${PORT}`);
});
