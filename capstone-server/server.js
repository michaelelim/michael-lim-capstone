const http = require('http');
const express = require('express');            
const socket = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = socket(server)

const botName = 'Server'

let player1 = ''
let player2 = 'JOIN NOW!'
let player1room = ''
let player2room = ''

// Run when client connects
app.get('/', (req, res) => {
  res.send("YDKDS Back-end")
})

io.on('connection', (socket) => {
  console.log('New PLAYER connected!');

  // socket.emit('message', 'Welcome to YDKDS') // Broadcast to client
  // socket.broadcast.emit('message', 'A player has joined the game'); // Broadcast to everyone except connecting user
  
  socket.on('disconnect', () => { //Runs when client disconnects
    console.log("A player has left");
    // io.emit('message', 'A player has left the game') // Broadcast to all
  }) 

  // Listen for room
  socket.on('roomName', (room) => {
    io.emit('roomName', room) // Broadcast to everyone
    socket.join(room)
  })

  // Listen for name using algorithm
  socket.on('name1', (name) => {
    console.log("name from client: ", name)
    console.log("in player1: ", player1)
    console.log("in player2: ", player2)
    if (name !== null && player1 === "" && player1 !== name) {
      player1 = name
      console.log("becoming name1")
      io.emit('name1broadcast', player1) // Broadcast to everyone
    } 
    else if (name !== null && player2 === "JOIN NOW!" && player1 !== name) {
      player2 = name
      console.log("becoming name2")
      io.emit('name1broadcast', player1) // Broadcast to everyone
      io.emit('name2broadcast', player2) // Broadcast to everyone
        
    }
  })

  // Listen for name1
  // socket.on('name1', (name1) => {
  //   if (name1 == null) {name1 = player1} 
  //   else {player1 = name1}
  //   io.emit('name1broadcast', name1) // Broadcast to everyone
  // })

  // // Listen for name2
  // socket.on('name2', (name2) => {
  //   if (name2 == null) {name2 = player2} 
  //   else {player2 = name2}
  //   io.emit('name2broadcast', name2) // Broadcast to everyone
  // })

  // Listen for advance button
  socket.on('advancebutton', () => {
    io.emit('advancebuttonbroadcast', true)
  })
})

const PORT = 3009 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))