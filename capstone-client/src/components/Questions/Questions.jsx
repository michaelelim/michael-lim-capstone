import React, { useState, useEffect } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import '../../App.scss';
import './Questions.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);
let questionServed = false;
let player1, player2 = '';
let theQuestions = []
let currentQuestion = {}
let question = ""
let choice1, choice2, choice3, choice4 = ""

export default function Questions() {
  // let [allChoices, setAllChoices] = useState({})
  // let [correctAnswer, setCorrectAnswer] = useState('')

  // const [text, setText] = useState('Question 1... ');
  // const onEnd = () => {
  //   return (
  //     <Link to="/questions2" component={Questions}/>
  //   )
  // };
  // const { speak, voices } = useSpeechSynthesis({onEnd});
  // const voice = voices[51];

  // const fadeOut = (item) => {
  //   const fadeTarget = document.querySelector(item)
  //   fadeTarget.classList.add("fade-out");
  //   fadeTarget.style.opacity = '0'
  // }

  const getQuestions = () => {
    if (theQuestions.length === 0) {
      console.log("theQuestions is null, asking for questions")
      socket.emit('sendQuestions', theQuestions) //ask server for questions
    } 
    else if (theQuestions.length !== 0 && questionServed === false) {
      questionServed = true;
      console.log("Serving questions")
      serveQuestions();
    }
  }

  useEffect(() => {
    // asking server for questions
    socket.on("advanceToQuestions", () => {if (theQuestions.length === 0) {getQuestions()}})
    
    //listen for move to next question
    socket.on("nextQuestion", () => {
      serveQuestions()
      document.querySelector(".question__wrapper").style.display = "flex"
      document.querySelector(".wrong-answer1").style.display = "flex"
      document.querySelector(".wrong-answer2").style.display = "flex"
      document.querySelector(".wrong-answer3").style.display = "flex"
    })

    //listen for questions from server
    socket.on("filteredQuestions", (data) => {
      theQuestions = data
      console.log("theQuestions", theQuestions)
      serveQuestions();
    }) 
    
    socket.on("name1broadcast", data1 => {player1 = data1})
    socket.on("name2broadcast", data2 => {player2 = data2})
    
    socket.on("removeWrongAnswer1", () => {document.querySelector(".wrong-answer1").style.display = "none"})
    socket.on("removeWrongAnswer2", () => {document.querySelector(".wrong-answer2").style.display = "none"})
    socket.on("removeWrongAnswer3", () => {document.querySelector(".wrong-answer3").style.display = "none"})

  }, [])

  // const shuffleAnswers = (question) => {
  //   setAllChoices(... question.correct_answer)
  //   setAllChoices(... question.incorrect_answers[0])
  //   setAllChoices(... question.incorrect_answers[1])
  //   setAllChoices(... question.incorrect_answers[2])
  //   console.log("allChoices:", allChoices)
  // }

  let serveQuestions = () => {
    currentQuestion = theQuestions.pop()
    question = currentQuestion.question
    console.log("question: ", question)
    choice1 = currentQuestion.correct_answer
    choice2 = currentQuestion.incorrect_answers[0]
    choice3 = currentQuestion.incorrect_answers[1]
    choice4 = currentQuestion.incorrect_answers[2]    
    console.log("Questions remaining bottom: ", theQuestions)
    // {shuffleAnswers(theQuestions[0])} WIP
  
  return (
    document.querySelector(".question").innerHTML = question,
    document.querySelector(".question__answer1").innerHTML = choice1,
    document.querySelector(".question__answer2").innerHTML = choice2,
    document.querySelector(".question__answer3").innerHTML = choice3,
    document.querySelector(".question__answer4").innerHTML = choice4
  )
}

  // Modal
  const submitCorrect = () => {
    document.getElementById("answerModal").style.display = "block";
    document.getElementById("answer1");

    document.querySelector(".question__wrapper").style.display = "none"
    document.querySelector(".modal-text").innerHTML = "Correct! You get 100 points!"
    
    // socket.emit('100Player1', socket.id);
    console.log("Current socket with correct answer: ", socket.id)
    socket.emit('100Player', socket.id);
    
    setTimeout(() => {
      document.getElementById("answerModal").style.display = "none"
      socket.emit('nextQuestion'); //move to next question
    }, 2000)
  }

  const submitIncorrect1 = () => {
    document.getElementById("answerModal").style.display = 'block';
    document.querySelector(".wrong-answer1");

    document.querySelector(".modal-text").innerHTML = "Incorrect! You lose 75 points!"
    socket.emit('minus75Player1');

    setTimeout(() => {
      document.getElementById("answerModal").style.display = "none"
      socket.emit('removeWrongAnswer1')
    }, 2000)
  }

  const submitIncorrect2 = () => {
    document.getElementById("answerModal").style.display = 'block';
    document.querySelector(".wrong-answer2");

    document.querySelector(".modal-text").innerHTML = "Incorrect! You lose 75 points!"
    socket.emit('minus75Player1');

    setTimeout(() => {
      document.getElementById("answerModal").style.display = "none"
      socket.emit('removeWrongAnswer2')
    }, 2000)
  }

  const submitIncorrect3 = () => {
    document.getElementById("answerModal").style.display = 'block';
    document.querySelector(".wrong-answer3");

    document.querySelector(".modal-text").innerHTML = "Incorrect! You lose 75 points!"
    socket.emit('minus75Player1');

    setTimeout(() => {
      document.getElementById("answerModal").style.display = "none"
      socket.emit('removeWrongAnswer3')
    }, 2000)
  }

  return (
    <div id="question-wrapper" className="App">
      
      <div id="answerModal" className="modal">
        <div className="modal-content">
          <p className="modal-text"></p>
        </div>
      </div>
      
      <div className="question__wrapper">
          <div className="question"></div>
          <div className="question__answer">
            <button className="question__answer-wrapper" id="answer1" onClick={submitCorrect}>
              <div className="question__letter">A:</div>
              <div className="question__answer1"></div>
            </button>
            <button className="question__answer-wrapper wrong-answer1" onClick={submitIncorrect1}>
              <div className="question__letter">B:</div>
              <div className="question__answer2"></div>
            </button>
            <button className="question__answer-wrapper wrong-answer2" onClick={submitIncorrect2}>
              <div className="question__letter">C:</div>
              <div className="question__answer3"></div>
            </button>
            <button className="question__answer-wrapper wrong-answer3" onClick={submitIncorrect3}>
              <div className="question__letter">D:</div>
              <div className="question__answer4"></div>
            </button>
          </div>
        </div>
    </div>  
  )
}
