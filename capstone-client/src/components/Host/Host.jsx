import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './Host.scss';

export default function Host() {
  const [text] = useState('Whos Playing? Tell your friends to join with the code below and press everyone is here when ready');
  const [name1, setName1] = useState('');
  const [room, setRoom] = useState('');

  const onEnd = () => {};
  const { speak, voices } = useSpeechSynthesis({onEnd});
  const voice = voices[51];

  return (
    <div className="App">
      <div className="host__wrapper">
        <h1 className="host__top">Host Settings</h1>
        
        <div className="host__bottom">
          <h4 className="host__name-title">Enter your name: </h4>
          <input className="host__name-input" type="text" onChange={(e) => {setName1(e.target.value)}}></input>
          <h4 className="host__code-text">Create a room name: </h4>
          <input className="host__code" type="text" onChange={(e) => {setRoom(e.target.value)}}></input>
        </div>
      </div>

    {console.log("name1: ", name1)}
    {console.log("room: ", room)}


      {/* WIP!! */}
      <Link to="/join" name={name1} onClick={() => {
            speak({ text, voice })
          }}><button className="button">Create Room</button></Link>
    </div>
  );
}
