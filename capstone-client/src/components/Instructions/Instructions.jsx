import React, {useEffect} from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './Instructions.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const STARTPOINT = 'http://127.0.0.1:3000';
const socket = socketIOClient(ENDPOINT);

export default function Instructions({name, room}) {
  // const [text] = useState('Question... number... 1...');
  // const onEnd = () => {};
  // const { speak, voices } = useSpeechSynthesis({onEnd});
  // const voice = voices[51];

  const advanceToServer = () => {
    console.log("Sending advance call to server")
    socket.emit('advanceButton', true)}

    useEffect(() => {
      socket.on("advancebuttonbroadcast", data => {
        window.location.href = STARTPOINT + "/questions/" + name + "/" + room;
      })
    }, [])


  return (
    <div id="the-instructions" className="App">
      <div className="instructions__wrapper">
        <h1 className="instructions__title">Instructions</h1>
      </div>

      <div className="instructions__wrapper-question">
        <div className="question__0">What is the capital of a fake question?</div>
        <div className="question__answer-wrapper">
          <div className="question__letter">A:</div>
          <div className="question__0-answer1">Fakesville, USA</div>
        </div>
        <div className="question__answer-wrapper">
          <div className="question__letter">B:</div>
          <div className="question__0-answer2">42</div>
        </div>
        <div className="question__answer-wrapper">
          <div className="question__letter">C:</div>
          <div className="question__0-answer3">When in doubt, pick C</div>
        </div>
        <div className="question__answer-wrapper">
          <div className="question__letter">D:</div>
          <div className="question__0-answer4">None of the above</div>
        </div>
      </div>

      <Link to={`/questions/${name}/${room}`}>
        <button className="button" onClick={advanceToServer}>We got it! Let's go!</button>
      </Link>
    </div>
  );
}
