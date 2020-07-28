import React, {useEffect} from 'react';
import '../../App.scss';
import './Instructions.scss';

export default function Instructions({room, socket}) {
  useEffect(() => {
    if (socket) {
      socket.on('advanceToQuestionIntro', () => {showQuestionIntro()})

      const showQuestionIntro = () => {
        document.querySelector("#the-instructions").style.display = "none"
        document.querySelector("#button__leave-instructions").style.display = "none"
        document.querySelector("#question-intro").style.display = "flex"
        setTimeout(() => {socket.emit('advanceButton', "goToQuestions")}, 1500)
      }
    }
  }, [socket])

  const advanceToServer = () => {socket.emit('advanceButton', "goToQuestionIntro")}

  return (
    <div id="the-instructions" className="App">
      <div className="instructions__wrapper">
        <h1 className="animate__animated animate__jackInTheBox instructions__title">Instructions</h1>
      </div>

      <div className="instructions__wrapper-question">
        <div className="question">It's a multiple choice quiz show! Possible answers appear below. Get points for picking correctly...</div>
        <button className="question__answer-wrapper button3 coolBeans">
          <div className="question__letter">A:</div>
          <div id="qa" className="question__answer1">Ah. I see...</div>
        </button>
        <button className="question__answer-wrapper button3 coolBeans">
          <div className="question__letter">B:</div>
          <div id="qa" className="question__answer2">Ingenious.</div>
        </button>
        <button className="question__answer-wrapper button3 coolBeans">
          <div className="question__letter">C:</div>
          <div id="qa" className="question__answer3">What a concept!</div>
        </button>
        <button className="question__answer-wrapper button3 coolBeans">
          <div className="question__letter">D:</div>
          <div id="qa" className="question__answer4">Where have a seen this game before?!</div>
        </button>
      </div>

      <button id="button__leave-instructions" className="button coolBeans" onClick={advanceToServer}>OKAY! Let's just play!</button>
    </div>
    );
  }
