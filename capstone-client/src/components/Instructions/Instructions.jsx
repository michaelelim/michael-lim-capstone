import React, {useEffect} from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import '../../App.scss';
import './Instructions.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);

export default function Instructions() {
  // const [tts] = useState('Question... number... 1...');
  // const { speak, voices } = useSpeechSynthesis({});
  // const voice = voices[51];

  const advanceToServer = () => {socket.emit('advanceButton', "goToQuestionIntro")}

  useEffect(() => {
    socket.on("advanceToQuestionIntro", () => {showQuestionIntro()})
  }, [])

  const showQuestionIntro = () => {
    document.querySelector("#the-instructions").style.display = "none"
    document.querySelector("#button__leave-instructions").style.display = "none"
    document.querySelector("#question-intro").style.display = "flex"
    setTimeout(() => {socket.emit('advanceButton', "goToQuestions")}, 1500)
  }

  return (
    <div id="the-instructions" className="App">
      <div className="instructions__wrapper">
        <h1 className="instructions__title">Instructions</h1>
      </div>

      <div className="instructions__wrapper-question">
        <div className="question">What is the capital of a fake question?</div>
        <button className="question__answer-wrapper button3">
          <div className="question__letter">A:</div>
          <div id="qa" className="question__answer1">Fakesville, USA</div>
        </button>
        <button className="question__answer-wrapper button3">
          <div className="question__letter">B:</div>
          <div id="qa" className="question__answer2">42</div>
        </button>
        <button className="question__answer-wrapper button3">
          <div className="question__letter">C:</div>
          <div id="qa" className="question__answer3">When in doubt, pick C</div>
        </button>
        <button className="question__answer-wrapper button3">
          <div className="question__letter">D:</div>
          <div id="qa" className="question__answer4">None of the above</div>
        </button>
      </div>

      <button id="button__leave-instructions" className="button" onClick={advanceToServer}>We got it! Let's go!</button>
    </div>
    );
  }
