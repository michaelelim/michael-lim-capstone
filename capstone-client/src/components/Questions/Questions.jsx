import React, { useState, useEffect } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
// import { Link } from 'react-router-dom';
import '../../App.scss';
import './Questions.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const STARTPOINT = 'http://127.0.0.1:3000';
const socket = socketIOClient(ENDPOINT);
let questionServed = false;
let player1 = '';
let player2 = '';

export default function Questions() {
  let [theQuestions, setTheQuestions] = useState([])
  let [question, setQuestion] = useState('')
  let [allChoices, setAllChoices] = useState([])
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
      socket.emit('listPlayers')
    } 
    else if (theQuestions.length !== 0 && questionServed === false) {
      questionServed = true;
      serveQuestions();
    }
  }

  useEffect(() => {
    console.log("going through useEffect")
    socket.on("questions", data => {setTheQuestions(data)}) //listen for questions from server
    console.log("Received questions:", theQuestions)
    socket.on("name1broadcast", data1 => {player1 = data1})
    console.log("player1: ", player1)
    socket.on("name2broadcast", data2 => {player2 = data2})
    console.log("player2: ", player2)
  }, [])

  const shuffleAnswers = (question) => {
    setAllChoices(... question.correct_answer)
    setAllChoices(... question.incorrect_answers[0])
    setAllChoices(... question.incorrect_answers[1])
    setAllChoices(... question.incorrect_answers[2])
    return(allChoices)
  }

   const serveQuestions = () => {
      console.log("Served Question: ", theQuestions[0])
      setQuestion = theQuestions[0].question
      {shuffleAnswers(theQuestions[0])}
    
    return (
      document.querySelector(".question__1").innerHTML = theQuestions[0].question,
      document.querySelector(".question__1-answer1").innerHTML = theQuestions[0].correct_answer,
      document.querySelector(".question__1-answer2").innerHTML = theQuestions[0].incorrect_answers[0],
      document.querySelector(".question__1-answer3").innerHTML = theQuestions[0].incorrect_answers[1],
      document.querySelector(".question__1-answer4").innerHTML = theQuestions[0].incorrect_answers[2],
      document.querySelector(".join__player-name1").innerHTML = player1,
      document.querySelector(".join__player-name2").innerHTML = player2
    )
}

  return (
    <div className="App">
      {getQuestions()}

      <div className="question__wrapper">
          <div className="question__1"></div>
          <div className="question__answer">
            <div className="question__answer-wrapper">
              <div className="question__letter">A:</div>
              <div className="question__1-answer1"></div>
            </div>
            <div className="question__answer-wrapper">
              <div className="question__letter">B:</div>
              <div className="question__1-answer2"></div>
            </div>
            <div className="question__answer-wrapper">
              <div className="question__letter">C:</div>
              <div className="question__1-answer3"></div>
            </div>
            <div className="question__answer-wrapper">
              <div className="question__letter">D:</div>
              <div className="question__1-answer4"></div>
            </div>
          </div>
        </div>

      <div className="join__player-wrapper">
        <div>
          <div className="join__player-number">Player 1</div>
          <div className="join__player-name1"></div>
        </div>
        
        <div>
          <div className="join__player-number">Player 2</div>
          <div className="join__player-name2"></div>
        </div>
      </div>  
    </div>
  )
}
