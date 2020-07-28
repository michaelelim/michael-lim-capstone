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
        <div className="question">What is the capital of a fake question?</div>
        <button className="question__answer-wrapper button3 coolBeans">
          <div className="question__letter">A:</div>
          <div id="qa" className="question__answer1">Fakesville, USA</div>
        </button>
        <button className="question__answer-wrapper button3 coolBeans">
          <div className="question__letter">B:</div>
          <div id="qa" className="question__answer2">42</div>
        </button>
        <button className="question__answer-wrapper button3 coolBeans">
          <div className="question__letter">C:</div>
          <div id="qa" className="question__answer3">When in doubt, pick C</div>
        </button>
        <button className="question__answer-wrapper button3 coolBeans">
          <div className="question__letter">D:</div>
          <div id="qa" className="question__answer4">None of the above</div>
        </button>
      </div>

      <button id="button__leave-instructions" className="button coolBeans" onClick={advanceToServer}>We got it! Let's go!</button>
    </div>
    );
  }
