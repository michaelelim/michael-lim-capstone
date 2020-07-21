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

  // listen for reiterate player names
  socket.on('listPlayers', () => {
    console.log("reiterating player names: ", player1, player2)
    io.emit('name1broadcast', player1)
    io.emit('name2broadcast', player2)
  })

  // Listen for advance button
  socket.on('advanceButton', () => {
    console.log("Advance call received")
    io.emit('advancebuttonbroadcast', true)
  })

  // Listen for time to serve questions
  const questions = require('./questions.json');
  const filteredQuestions = [];
  let questionsSent = false;

  // Fisher-Yates shuffle algorithm
  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  // listen for request for questions
  socket.on('sendQuestions', () => { 
    console.log("questionsSent?", questionsSent)
    if (questionsSent === false) {
      console.log('Shuffling questions!')
      questionsSent = true;
      shuffle(questions);
      for (let i = 0; i < 3; i++) {filteredQuestions.push(questions[i])}
    }
    console.log('Sending questions: ', filteredQuestions)
    io.emit('questions', filteredQuestions) //broadcast to all
  })

})

const PORT = 3009 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))