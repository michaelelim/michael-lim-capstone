import React, { useState } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './Host.scss';
// import socketIOClient from 'socket.io-client';

// const ENDPOINT = 'https://michaelelim-capstone-server.herokuapp.com/';

export default function Host() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  // let [socket, setSocket] = useState();

  // const { speak, voices } = useSpeechSynthesis();
  // const voice = voices[51];

  // set socket
  // useEffect(() => {
  //   setSocket(socketIOClient(ENDPOINT, {
  //     transports: ['websocket'], 
  //     reconnectionAttempts: 3,
  //     reconnectionDelay: 3000
  //   }));
  // }, [])

  // const pullQuestions = () => {
  //   socket.on('advanceButton', 'pullQuestions', room)
  // }

  return (
    <div className="host__wrapper">
      <h1 className="animate__animated animate__lightSpeedInRight host__top">Host Settings</h1>
      
      <div className="host__bottom">
        <h4 className="host__name-title">Enter your name: </h4>
        <input className="host__name-input" type="text" onChange={(e) => {setName(e.target.value)}}></input>
        <h4 className="host__code-text">Create a room name: </h4>
        <input className="host__code" type="text" onChange={(e) => {setRoom(e.target.value)}}></input>
      </div>

      <Link to={`/join/${name}/${room}`} room={room}>
        <button id="create-room-button" className="button coolBeans">Create Room</button>
      </Link>  
    </div>
  );
}
