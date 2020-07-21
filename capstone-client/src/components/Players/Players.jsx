import React, { useState, useEffect } from 'react';
import '../../App.scss';
import './Players.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);

export default function Players({name1, name2}) {
  let [name1Final, setName1Final] = useState(name1);
  let [name2Final, setName2Final] = useState(name2);

  useEffect(() => {
    if (name1Final !== null) {socket.on("name1broadcast", data => {setName1Final(data)})} //listen for name1broadcast
    if (name2Final !== "JOIN NOW!") {socket.on("name2broadcast", data => {setName2Final(data)})} //listen for name2broadcast
  }, [])

  return (
      <div className="players__wrapper">
        <div>
          <div className="players__number">Player 1</div>
          <div id="player1" className="players__name1">{name1Final}</div>
        </div>
        
        <div>
          <div className="players__number">Player 2</div>
          <div id="player2" className="players__name2">{name2Final}</div>
        </div>
      </div>       
  );
}
