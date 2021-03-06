import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './JoinRoom.scss';

export default function JoinRoom() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="join-room__wrapper">
      <h1 className="animate__animated animate__lightSpeedInLeft join-room__top">Join a Room</h1>
      
      <div className="join-room__bottom">
        <h4 className="join-room__name-title">Enter your name: </h4>
        <input className="join-room__name-input" type="text" onChange={(e) => {setName(e.target.value)}}></input>
        <h4 className="join-room__code-text">Enter the room: </h4>
        <input className="join-room__code" type="text" onChange={(e) => {setRoom(e.target.value)}}></input>
      </div>

      <Link to={`/join/${name}/${room}`}>
        <button className="button coolBeans">Join Room</button>
      </Link>  
    </div>
  );
}