import React, { useState, useEffect } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import '../../App.scss';
import './Join.scss';
import socketIOClient from 'socket.io-client';
import Players from '../Players/Players'
import Instructions from '../Instructions/Instructions'
import '../Instructions/Instructions.scss';
import QuestionIntro from '../QuestionIntro/QuestionIntro'
import '../QuestionIntro/QuestionIntro.scss';
import Questions from '../Questions/Questions'
import '../Questions/Questions.scss';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);

export default function Join({name, room}) {
  let [name1Final, setName1Final] = useState('');
  let [name2Final, setName2Final] = useState("JOIN NOW!");
  // let [gameState, setGameState] = useState("instructions");

  const roomToServer = () => {socket.emit('roomName', room)}
  const nameToServer = () => {
    socket.emit('name1', name)
    socket.emit('name1id', socket.id)
  }

  const advanceToServer = () => {
    socket.emit('advanceButton', "goToInstructions")}

    useEffect(() => {
      socket.on("name1broadcast", data => {setName1Final(data)})
      socket.on("name2broadcast", data => {setName2Final(data)})
      socket.on("advanceToInstructions", () => {showInstructions()})
    }, [])

  // const [text] = useState('The instructions are simple!  A question will come up and you have to choose the correct answer on your device.  If you have the most points... you win!');

  // const onEnd = () => {};
  // const { speak, voices } = useSpeechSynthesis();
  // const voice = voices[51];

  const showInstructions = () => {
      document.querySelector("#the-join").style.display = "none"
      document.querySelector(".button__everyone-here").style.display = "none"
      document.querySelector(".players__wrapper").style.display = "none"
      document.querySelector("#the-instructions").style.display = "flex"
  }

  return (
    <div className="App">
      <div id="the-join" className="App">
        {roomToServer()}
        {nameToServer()}
        {/* {name2ToServer()} */}
        <div className="join__wrapper">
          <h1 className="join__left">Who's playing?</h1>
          
          <div className="join__right">
            <h4 className="join__room-title">Room code: </h4>
            <div className="join__room">{room}</div>
          </div>
        </div>
      </div>

      <Questions />
      <Players name1={name1Final} name2={name2Final}/>

      {/* <Link to="/instructions" onClick={() => {speak({ text, voice })}}> */}
      <button className="button button__everyone-here" onClick={advanceToServer}>Everyone's here!</button>
      <Instructions />
      <QuestionIntro />
    </div>
  );
}
