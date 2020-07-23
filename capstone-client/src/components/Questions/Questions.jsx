import React, { useState, useEffect } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import '../../App.scss';
import './Questions.scss';
import socketIOClient from 'socket.io-client';

// import DOMPurify from 'dompurify'
// const createDOMPurify = require('dompurify');
// const { JSDOM } = require('jsdom');
// const window = new JSDOM('').window;
// const DOMPurify = createDOMPurify(window);
// const clean = DOMPurify.sanitize(dirty);

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);
let questionServed = false
let player1, player2 = ''
let theQuestions = []
let currentQuestion = {}
let question = ""
let choice1, choice2, choice3, choice4 = ""
let correctAnswer = ""
let allAnswers = []
let wrongAnswerCount = 0

export default function Questions(clientId) {
  // const [tts, setTts] = useState('Question 1... ');
  // const { speak, voices } = useSpeechSynthesis({onEnd});
  // const voice = voices[51];

  const getQuestions = () => {
    if (theQuestions.length === 0) {
      socket.emit('sendQuestions', theQuestions) //ask server for questions
    } 
    else if (theQuestions.length !== 0 && questionServed === false) {
      questionServed = true;
      serveQuestions();
    }
  }

  useEffect(() => {
    // asking server for questions
    socket.on("advanceToQuestions", () => {if (theQuestions.length === 0) {getQuestions()}})
    
    //listen for move to next question
    socket.on("nextQuestion", () => {
      wrongAnswerCount = 0
      serveQuestions()
      document.querySelector(".question__wrapper").style.display = "flex"
      document.querySelector("#answer1").style.display = "flex"
      document.querySelector("#answer2").style.display = "flex"
      document.querySelector("#answer3").style.display = "flex"
      document.querySelector("#answer4").style.display = "flex"
    })

    //listen for questions from server
    socket.on("filteredQuestions", (data) => {
      theQuestions = data
      serveQuestions();
    }) 
    
    socket.on("name1broadcast", data1 => {player1 = data1})
    socket.on("name2broadcast", data2 => {player2 = data2})

    socket.on('removeWrongAnswer', (thisAnswer) => {
      wrongAnswerCount++;
      if (wrongAnswerCount === 4) {
        socket.emit('nextQuestion')
      }  
      for (const p of document.querySelectorAll("p")) {
        if (p.textContent.includes(thisAnswer)) {
          p.parentElement.style.display = "none"
        }}
    
    })
  }, [])

  const shuffleAnswers = (currentQuestion) => {
    console.log("correct answer is: ", currentQuestion.correct_answer)
    allAnswers = []
    allAnswers.push(currentQuestion.correct_answer)
    allAnswers.push(currentQuestion.incorrect_answers[0])
    allAnswers.push(currentQuestion.incorrect_answers[1])
    allAnswers.push(currentQuestion.incorrect_answers[2])
    shuffle(allAnswers)
  }

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

  let serveQuestions = () => {
    if (theQuestions.length >= 2) {
      currentQuestion = theQuestions.pop()
      question = currentQuestion.question
      correctAnswer = currentQuestion.correct_answer
      shuffleAnswers(currentQuestion)
      choice1 = allAnswers[0]
      choice2 = allAnswers[1]
      choice3 = allAnswers[2]
      choice4 = allAnswers[3]
      console.log("Questions remaining: ", theQuestions)
      
    return (
      document.querySelector(".question").innerHTML = question,
      document.querySelector(".question__answer1").innerHTML = choice1,
      document.querySelector(".question__answer2").innerHTML = choice2,
      document.querySelector(".question__answer3").innerHTML = choice3,
      document.querySelector(".question__answer4").innerHTML = choice4
    )
    }
  }

  // Modal - Correct/Incorrect Answers 
  const submitAnswer = (arg) => {
    const thisAnswer = document.querySelector(".question__" + arg).innerHTML
    const thisAnswer2 = document.querySelector(".question__" + arg).textContent
    document.getElementById("answerModal").style.display = "block";

    if (document.querySelector(".question__" + arg).innerHTML === correctAnswer ) {
      document.querySelector(".question__wrapper").style.display = "none"
      document.querySelector(".modal-text").innerHTML = "Correct! You get 100 points!"
      socket.emit('100Player', clientId);

        setTimeout(() => {
          document.getElementById("answerModal").style.display = "none"
          if (theQuestions.length === 1) {
            socket.emit('advanceButton', "goToWinner")
          } else {
            socket.emit('nextQuestion')
          }
        }, 2000)

      } else if (document.querySelector(".question__" + arg).innerHTML !== correctAnswer) {
        document.querySelector(".modal-text").innerHTML = "Incorrect! You lose 75 points!"
        socket.emit('minus75Player', clientId);

        setTimeout(() => {
          document.getElementById("answerModal").style.display = "none"
          socket.emit('removeWrongAnswer', thisAnswer)
        }, 2000)
      }
  }
    
  return (
    <div id="question-wrapper" className="App">      
      <div id="answerModal" className="modal">
        <div className="modal-content">
          <div className="modal-text"></div>
        </div>
      </div>
      
      <div className="question__wrapper">
        <div className="question"></div>
        <div className="question__answer">
          <button className="question__answer-wrapper button3" id="answer1" onClick={() => {submitAnswer("answer1")}}>
            <div className="question__letter">A:</div>
            <p className="question__answer1"></p>
          </button>
          <button className="question__answer-wrapper button3" id="answer2" onClick={() => {submitAnswer("answer2")}}>
            <div className="question__letter">B:</div>
            <p className="question__answer2"></p>
          </button>
          <button className="question__answer-wrapper button3" id="answer3" onClick={() => {submitAnswer("answer3")}}>
            <div className="question__letter">C:</div>
            <p className="question__answer3"></p>
          </button>
          <button className="question__answer-wrapper button3" id="answer4" onClick={() => {submitAnswer("answer4")}}>
            <div className="question__letter">D:</div>
            <p className="question__answer4"></p>
          </button>
        </div>
      </div>
    </div>  
  )
}
