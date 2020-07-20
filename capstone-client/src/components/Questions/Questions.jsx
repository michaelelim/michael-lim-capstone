import React, { useState, useEffect } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
// import { Link } from 'react-router-dom';
import '../../App.scss';
import './Questions.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const STARTPOINT = 'http://127.0.0.1:3000';
const socket = socketIOClient(ENDPOINT);

export default function Questions() {
  let [sendQuestion, setSendQuestion] = useState([])
  let [question, setQuestion] = useState('')
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

  const getQuestion = () => {
    socket.emit('sendQuestion', sendQuestion)
  }

  useEffect(() => {
    socket.on("question", data => {setSendQuestion(data)})
      console.log(sendQuestion)
  }, [])

  return (
    <div className="App">
      {getQuestion()}

      <div className="question__wrapper">
        <div className="question__1">The song &quot;Feel Good Inc.&quot; by British band Gorillaz features which hip hop group?</div>
        <div className="question__answer">
          <div className="question__answer-wrapper">
            <div className="question__letter">A:</div>
            <div className="question__1-answer1">De La Soul</div>
          </div>
          <div className="question__answer-wrapper">
            <div className="question__letter">B:</div>
            <div className="question__1-answer2">Public Enemy</div>
          </div>
          <div className="question__answer-wrapper">
            <div className="question__letter">C:</div>
            <div className="question__1-answer3">OutKast</div>
          </div>
          <div className="question__answer-wrapper">
            <div className="question__letter">D:</div>
            <div className="question__1-answer4">Cypress Hill</div>
          </div>
        </div>
      </div>


      <div className="join__player-wrapper">
        <div>
          <div className="join__player-number">Player 1</div>
          <div className="join__player-name">Adam</div>
        </div>
        
        <div>
          <div className="join__player-number">Player 2</div>
          <div className="join__player-name">Eve</div>
        </div>
      </div>  
    </div>
  );
}
