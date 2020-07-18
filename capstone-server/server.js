const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io')
const formatMessage = require('./utils/messages.jsx')

const app = express();
const server = http.createServer(app)
const io = socketio(server)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'YDKDS Bot'

// Run when client connects
io.on('connection', socket => {
  console.log('New WS Connection...');

  socket.emit('message', formatMessage(botName, 'Welcome to YDKDS')) // Broadcast to client
  socket.broadcast.emit('message', formatMessage(botName, 'A user has joined the chat')); // Broadcast to everyone except connecting user
  socket.on('disconnect', () => { //Runs when client disconnects
    io.emit('message', formatMessage(botName, 'A user has left the chat')) // Broadcast to all
  }) 

  // Listen for chatMessage
  socket.on('chatMessage', (msg) => {
    io.emit('message', formatMessage('USER', msg)) // Broadcast to everyone
  })
})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))