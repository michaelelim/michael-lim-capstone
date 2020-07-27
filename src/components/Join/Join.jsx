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

export default function Join({ name, room }) {
  let [clientId] = useState(uuidv4());
  let [socket, setSocket] = useState();

  // set socket
  useEffect(() => {
    setSocket(socketIOClient(ENDPOINT, {
      transports: ['websocket'], 
      reconnectionAttempts: 3,
      reconnectionDelay: 3000
    }));
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('advanceToInstructions', () => {showInstructions()});
      socket.emit('userName', name, clientId, room)
    }
  }, [socket, clientId])

  const advanceToServer = (room) => {
    socket.emit('advanceButton', "goToInstructions", room)
  }

  const showInstructions = () => {
    document.querySelector("#the-join").style.display = "none"
    document.querySelector(".button__everyone-here").style.display = "none"
    document.querySelector(".players__wrapper").style.display = "none"
    document.querySelector("#the-instructions").style.display = "flex"
  }

  return (
    <div className="App">
      <div id="the-join" className="App">
        <div className="join__wrapper">
          <h1 className="animate__animated animate__rotateInDownLeft join__left">Who's playing?</h1>
          
          <div className="join__right">
            <h4 className="join__room-title">Room code: </h4>
            <div className="animate__animated animate__flash join__room">{room}</div>
          </div>
        </div>
      </div>

      <Questions clientId={clientId} room={room} socket={socket} />
      <Players clientId={clientId} room={room} socket={socket} />

      {/* <Link to="/instructions" onClick={() => {speak({ text, voice })}}> */}
      <button className="button button__everyone-here" onClick={() => {advanceToServer(room)}}>Everyone's here!</button>
      <Instructions room={room} socket={socket}/>
      <QuestionIntro room={room} socket={socket}/>
    </div>
  );
}
