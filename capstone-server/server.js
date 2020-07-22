const http = require('http');
const express = require('express');            
const socket = require('socket.io')
const app = express();
const server = http.createServer(app)
const io = socket(server)

let player1 = ''
let player2 = 'JOIN NOW!'
let player1Id = ''
let player2Id = ''

io.on('connection', (socket) => {
  console.log('New PLAYER connected!: ', socket.id);
  
  socket.on('disconnect', () => {console.log("A player has left");}) 

  // Listen for room
  socket.on('roomName', (room) => {
    io.emit('roomName', room) // Broadcast to everyone
    socket.join(room)
  })

  // Listen for name using algorithm
  socket.on('name1', (name) => {
    if (name !== null && player1 === "" && player1 !== name) {
      player1 = name      
      player1Id = socket.id
      console.log("player1Id: ", player1Id)
      io.emit('name1broadcast', player1)
      io.emit('name1Id', player1Id)
    } 
    else if (name !== null && player2 === "JOIN NOW!" && player1 !== name) {
      player2 = name
      player2Id = socket.id
      io.emit('name1broadcast', player1)
      io.emit('name2broadcast', player2)
      io.emit('name2Id', player2Id)
    }
  })

  // listen for reiterate player names
  socket.on('listPlayers', () => {
    console.log("reiterating player names: ", player1, player2)
    io.emit('name1broadcast', player1)
    io.emit('name2broadcast', player2)
  })

  // Listen for advance button
  socket.on('advanceButton', (item) => {
    console.log("Advance call received")
    if (item === "goToInstructions") {io.emit('advanceToInstructions', item)}
    if (item === "goToQuestionIntro") {io.emit('advanceToQuestionIntro', item)}
    if (item === "goToQuestions") {io.emit('advanceToQuestions', item)}
  })

  // Listen for time to serve questions
  const questions = require('./questions.json');
  const filteredQuestions = [];

  // Fisher-Yates shuffle algorithm
  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  // listen for request for questions
  let questionsSent = false;
  socket.on('sendQuestions', () => { 
    console.log("questionsSent?", questionsSent)
    if (questionsSent === false) {
      console.log('Shuffling questions!')
      questionsSent = true;
      shuffle(questions);
      for (let i = 0; i < 11; i++) {filteredQuestions.push(questions[i])}
    }
    console.log('Sending questions: ', filteredQuestions)
    io.emit('filteredQuestions', filteredQuestions) //broadcast to all
  })

  // listen for signal for nextQuestion
  socket.on('nextQuestion', () => {io.emit('nextQuestion')})

  // listen for removeWrongAnswers
  socket.on('removeWrongAnswer1', () => {io.emit('removeWrongAnswer1')})
  socket.on('removeWrongAnswer2', () => {io.emit('removeWrongAnswer2')})
  socket.on('removeWrongAnswer3', () => {io.emit('removeWrongAnswer3')})

  // listen for correct answers
  socket.on('100Player1', () => {io.emit('100Player1')})
  socket.on('minus75Player1', () => {io.emit('minus75Player1')})
})

const PORT = 3009 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))