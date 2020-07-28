import React, {useEffect} from 'react';
import '../../App.scss';
import './QuestionIntro.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'https://michaelelim-capstone-server.herokuapp.com/';
const socket = socketIOClient(ENDPOINT, {
  transports: ['websocket'], 
  reconnectionAttempts: 3,
  reconnectionDelay: 3000
});

export default function QuestionIntro(room) {  
  useEffect(() => {
    socket.on('advanceToQuestions', () => {
      fadeOut(".question-intro__title")
      setTimeout(() => {
        document.querySelector("#question-intro").style.display = "none"
        document.querySelector("#question-wrapper").style.display = "flex"
        document.querySelector(".players__wrapper").style.display = "flex"
      }, 1000)
    })
  }, [])

  const fadeOut = (item) => {
    const fadeTarget = document.querySelector(item)
    fadeTarget.classList.add("fade-out");
    fadeTarget.style.opacity = '0'
  }

  return (
    <div id="question-intro" className="App">
      <h1 className="question-intro__title">Question 1</h1>
    </div>
  );
}
