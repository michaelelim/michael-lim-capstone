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
import { v4 as uuidv4 } from 'uuid';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT, {
  transports: ['websocket'], 
  reconnectionAttempts: 3,
  reconnectionDelay: 3000
});
let clientId = uuidv4();

export default function Join({name, room}) {
  let [name1Final, setName1Final] = useState('');
  let [name2Final, setName2Final] = useState("JOIN NOW!");

  const userToServer = () => {socket.emit('userName', name, clientId, room)}
  // const roomToServer = () => {socket.emit('roomName', room)}
  // const nameToServer = () => {socket.emit('name1', name, clientId) }

  const advanceToServer = (room) => {
    socket.emit('advanceButton', "goToInstructions", room)}

    useEffect(() => {
      socket.on("name1broadcast", data => {setName1Final(data)})
      socket.on("name2broadcast", data => {setName2Final(data)})
      socket.on('advanceToInstructions', () => {showInstructions()})
    }, [])

  // const [tts] = useState('The instructions are simple!  A question will come up and you have to choose the correct answer on your device.  If you have the most points... you win!');
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
        {/* {roomToServer()}
        {nameToServer()} */}
        {userToServer()}
        <div className="join__wrapper">
          <h1 className="join__left">Who's playing?</h1>
          
          <div className="join__right">
            <h4 className="join__room-title">Room code: </h4>
            <div className="join__room">{room}</div>
          </div>
        </div>
      </div>

      <Questions clientId={clientId} room={room}/>
      <Players name1={name1Final} name2={name2Final} room={room}/>

      {/* <Link to="/instructions" onClick={() => {speak({ text, voice })}}> */}
      <button className="button button__everyone-here" onClick={() => {advanceToServer(room)}}>Everyone's here!</button>
      <Instructions room={room}/>
      <QuestionIntro room={room}/>
    </div>
  );
}
