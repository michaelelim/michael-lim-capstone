import React, { useState, useEffect } from 'react';
import '../../App.scss';
import './Players.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);
let player1 = '';
let player2 = '';

export default function Players({name1, name2}) {
  let [name1Final, setName1Final] = useState(player1);
  let [name2Final, setName2Final] = useState(player2);
  
  const setPlayers = () => {
    console.log("Setting players: ", name1Final, name2Final)
    player1 = name1Final
    player2 = name2Final
  }

  useEffect(() => {
    if (name1Final !== null) {socket.on("name1broadcast", data => {setName1Final(data)})} //listen for name1broadcast
    if (name2Final !== "JOIN NOW!") {socket.on("name2broadcast", data => {setName2Final(data)})} //listen for name2broadcast
    if (name1Final === "" && name2Final === "") {socket.emit('listPlayers')}
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
        {setPlayers()}
      </div>             
  );
}
