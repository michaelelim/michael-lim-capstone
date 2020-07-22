import React, { useState, useEffect } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import '../../App.scss';
import './Questions.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);
let questionServed = false;
let player1 = '';
let player2 = '';

export default function Questions() {
  let [theQuestions, setTheQuestions] = useState([])
  let [currentQuestion, setCurrentQuestion] = useState({}) //current full question
  let [question, setQuestion] = useState('') //only the question portion
  let [allChoices, setAllChoices] = useState({})
  let [choice1, setChoice1] = useState('')
  let [choice2, setChoice2] = useState('')
  let [choice3, setChoice3] = useState('')
  let [choice4, setChoice4] = useState('')
  let [correctAnswer, setCorrectAnswer] = useState('')

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
    socket.on("advanceToQuestions", () => {
      if (theQuestions.length === 0) {
        getQuestions()
        console.log("Asking server for questions")
      }      
    })
    
    //listen for questions from server
    socket.on("filteredQuestions", data => {      
      theQuestions = data
      console.log("theQuestions[0]: ", theQuestions[0])
      console.log("theQuestions[1]: ", theQuestions[1])
      console.log("theQuestions[2]: ", theQuestions[2])
      console.log("theQuestions", theQuestions)
      serveQuestions();
    }) 
    
    socket.on("name1broadcast", data1 => {
      player1 = data1
      console.log("player1: ", player1)
    })
    
    socket.on("name2broadcast", data2 => {
      player2 = data2
      console.log("player2: ", player2)
    })
    
  }, [])

  // const shuffleAnswers = (question) => {
  //   setAllChoices(... question.correct_answer)
  //   setAllChoices(... question.incorrect_answers[0])
  //   setAllChoices(... question.incorrect_answers[1])
  //   setAllChoices(... question.incorrect_answers[2])
  //   console.log("allChoices:", allChoices)
  // }

  const serveQuestions = () => {
    currentQuestion = theQuestions.pop()
    console.log("currentQuestion: ", currentQuestion)
    question = currentQuestion.question
    console.log("question: ", question)
    choice1 = currentQuestion.correct_answer
    choice2 = currentQuestion.incorrect_answers[0]
    choice3 = currentQuestion.incorrect_answers[1]
    choice4 = currentQuestion.incorrect_answers[2]    
    // {shuffleAnswers(theQuestions[0])}
  
  return (
    console.log("currentQuestion: ", currentQuestion),
    document.querySelector(".question").innerHTML = question,
    document.querySelector(".question__answer1").innerHTML = choice1,
    document.querySelector(".question__answer2").innerHTML = choice2,
    document.querySelector(".question__answer3").innerHTML = choice3,
    document.querySelector(".question__answer4").innerHTML = choice4
  )
}

  // const submitChoice = (choice) => {
  //   console.log("clicked: ", choice)
  //   if (choice.target.id === 1) {
  //     Correct()
  //     // document.querySelector(".correct").style.display = "absolute"
  //   } else if (choice.target.id !== 1) {
  //     Incorrect()
  //     // document.querySelector(".incorrect").style.display = "absolute"
  //   }
  // }

  // function Correct() {
  //   return (
  //     document.querySelector("#question-wrapper").style.display = "none",
  //     <div className="correct">
  //       <h1>CORRECT! YOU GET 100 POINTS!</h1>
  //     </div>      
  //   )
  // }
  
  // function Incorrect() {
  //   return (
  //     <div className="incorrect">
  //       <h1>INCORRECT! YOU LOSE 75 POINTS!</h1>
  //     </div>      
  //   )
  // }

  // Modal
  const submitCorrect = () => {
    const modal = document.getElementById("answerModal");
    const answerButton = document.getElementById("answer1");
    const span = document.getElementsByClassName("close")[0];

    document.querySelector(".modal-text").innerHTML = "Correct! You get 100 points!"

    answerButton.onclick = () => {modal.style.display = "block"}
  
    span.onclick = () => {modal.style.display = "none"}
    window.onclick = function(event) {if (event.target == modal) {modal.style.display = "none"}}

    // WIP!!!
    // setTimeout(() => {serveQuestions()}, 2000)
  }

  const submitIncorrect1 = () => {
    const modal = document.getElementById("answerModal");
    const answerButton = document.querySelector(".wrong-answer1");
    const span = document.getElementsByClassName("close")[0];

    document.querySelector(".modal-text").innerHTML = "Incorrect! You lose 75 points!"

    answerButton.onclick = () => {modal.style.display = "block"}
  
    span.onclick = () => {
      modal.style.display = "none"
      document.querySelector(".wrong-answer1").style.display = "none"
    }
    window.onclick = function(event) {if (event.target == modal) {
      modal.style.display = "none"
      document.querySelector(".wrong-answer1").style.display = "none"
    }}
  }

  const submitIncorrect2 = () => {
    const modal = document.getElementById("answerModal");
    const answerButton = document.querySelector(".wrong-answer2");
    const span = document.getElementsByClassName("close")[0];

    document.querySelector(".modal-text").innerHTML = "Incorrect! You lose 75 points!"

    answerButton.onclick = () => {modal.style.display = "block"}
  
    span.onclick = () => {
      modal.style.display = "none"
      document.querySelector(".wrong-answer2").style.display = "none"
    }
    window.onclick = function(event) {if (event.target == modal) {
      modal.style.display = "none"
      document.querySelector(".wrong-answer2").style.display = "none"
    }}
  }

  const submitIncorrect3 = () => {
    const modal = document.getElementById("answerModal");
    const answerButton = document.querySelector(".wrong-answer3");
    const span = document.getElementsByClassName("close")[0];

    document.querySelector(".modal-text").innerHTML = "Incorrect! You lose 75 points!"

    answerButton.onclick = () => {modal.style.display = "block"}
  
    span.onclick = () => {
      modal.style.display = "none"
      document.querySelector(".wrong-answer3").style.display = "none"
    }
    window.onclick = function(event) {if (event.target == modal) {
      modal.style.display = "none"
      document.querySelector(".wrong-answer3").style.display = "none"
    }}

 
  }

  return (
    <div id="question-wrapper" className="App">
      
      <div id="answerModal" className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <p className="modal-text">Yay!</p>
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
