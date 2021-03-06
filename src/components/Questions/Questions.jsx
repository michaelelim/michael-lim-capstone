import React, { useEffect } from 'react';
import '../../App.scss';
import './Questions.scss';

let questionServed = false
let theQuestions = []
let currentQuestion = {}
let question = ""
let choice1, choice2, choice3, choice4 = ""
let correctAnswer = ""
let allAnswers = []
let wrongAnswerCount = 0

export default function Questions({ room, clientId, socket }) {

  useEffect(() => {
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
          
        return (
          document.querySelector(".question").innerHTML = question,
          document.querySelector(".question__answer1").innerHTML = choice1,
          document.querySelector(".question__answer2").innerHTML = choice2,
          document.querySelector(".question__answer3").innerHTML = choice3,
          document.querySelector(".question__answer4").innerHTML = choice4
        )
        }
      }

      const shuffleAnswers = (currentQuestion) => {
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

      if (socket) {

        const getQuestions = () => {
          if (theQuestions.length === 0) {socket.emit('sendQuestions', theQuestions)} 
          else if (theQuestions.length !== 0 && questionServed === false) {
            questionServed = true;
            serveQuestions();
          }
        }

        // asking server for questions
        socket.on("advanceToQuestions", () => {if (theQuestions.length === 0) {
          getQuestions()
        }
        })
      
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
      
      socket.on('removeWrongAnswer', (thisAnswer, room) => {
        wrongAnswerCount++;
        if (wrongAnswerCount === 4) {socket.emit('nextQuestion')}  
        for (const p of document.querySelectorAll("p")) {
          if (p.textContent.includes(thisAnswer)) {p.parentElement.style.display = "none"}}    
      })

      socket.on('100Player1', (theName) => {showCorrectModal(theName[0].name)})
      socket.on('100Player2', (theName) => {showCorrectModal(theName[1].name)})
      socket.on('100Player3', (theName) => {showCorrectModal(theName[2].name)})
      socket.on('100Player4', (theName) => {showCorrectModal(theName[3].name)})

      const showCorrectModal = (finalName) => {
        document.getElementById("answerModal").style.display = "block";
        document.querySelector(".question__wrapper").style.display = "none"
        document.querySelector(".modal-text").innerHTML = `Correct! ${finalName} gets 100 points!`
        setTimeout(() => {document.getElementById("answerModal").style.display = "none"}, 2000)
      }

      socket.on('minus75Player1', (theName) => {showIncorrectModal(theName[0].name)})
      socket.on('minus75Player2', (theName) => {showIncorrectModal(theName[1].name)})
      socket.on('minus75Player3', (theName) => {showIncorrectModal(theName[2].name)})
      socket.on('minus75Player4', (theName) => {showIncorrectModal(theName[3].name)})

      const showIncorrectModal = (finalName) => {
        document.getElementById("answerModal").style.display = "block";
        document.querySelector(".modal-text").innerHTML = `Incorrect! ${finalName} loses 75 points!`
        setTimeout(() => {document.getElementById("answerModal").style.display = "none"}, 2000)
      }
    }
  }, [socket])

  // Modal - Correct/Incorrect Answers 
  const submitAnswer = (arg) => {
    const thisAnswer = document.querySelector(".question__" + arg).innerHTML

    if (document.querySelector(".question__" + arg).innerHTML === correctAnswer ) {
      socket.emit('100Player', clientId, room);
      setTimeout(() => {
        if (theQuestions.length === 1) {socket.emit('advanceButton', "goToWinner", room)} 
        else {socket.emit('nextQuestion')}
      }, 2000)
    
    } else if (document.querySelector(".question__" + arg).innerHTML !== correctAnswer) {
      socket.emit('minus75Player', clientId, room);
        setTimeout(() => {socket.emit('removeWrongAnswer', thisAnswer, room)}, 2000)
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
        <span className="question"></span>
        <div className="question__answer">
          <button className="question__answer-wrapper button3 coolBeans" id="answer1" onClick={() => {submitAnswer("answer1")}}>
            <div className="question__letter">A:</div>
            <p className="question__answer1"></p>
          </button>
          <button className="question__answer-wrapper button3 coolBeans" id="answer2" onClick={() => {submitAnswer("answer2")}}>
            <div className="question__letter">B:</div>
            <p className="question__answer2"></p>
          </button>
          <button className="question__answer-wrapper button3 coolBeans" id="answer3" onClick={() => {submitAnswer("answer3")}}>
            <div className="question__letter">C:</div>
            <p className="question__answer3"></p>
          </button>
          <button className="question__answer-wrapper button3 coolBeans" id="answer4" onClick={() => {submitAnswer("answer4")}}>
            <div className="question__letter">D:</div>
            <p className="question__answer4"></p>
          </button>
        </div>
      </div>
    </div>  
  )
}
