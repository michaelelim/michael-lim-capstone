import React, { useState, useEffect } from 'react';
import '../../App.scss';
import './Players.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);
let player1 = '';
let player2 = '';
let player1Id = '';
let player2Id = '';
let score1 = 0;
let score2 = 0;

export default function Players() {
  let [name1Final, setName1Final] = useState(player1);
  let [name2Final, setName2Final] = useState(player2);
  let [score1Final, setScore1Final] = useState(score1);
  let [score2Final, setScore2Final] = useState(score2);
  // let [name1IdFinal, setName1IdFinal] = useState(player1Id);
  // let [name2IdFinal, setName2IdFinal] = useState(player2Id);

  const setPlayers = () => {
    if (player1 !== "" || player2 !== "") {
    console.log("Setting players and scores: ", name1Final, name2Final)
    player1 = name1Final
    player2 = name2Final
    }
  }

  useEffect(() => {
    if (name1Final !== null) {socket.on("name1broadcast", data => {setName1Final(data)})} //listen for name1broadcast
    if (name2Final !== "JOIN NOW!") {socket.on("name2broadcast", data => {setName2Final(data)})} //listen for name2broadcast
    if (name1Final === "" && name2Final === "") {socket.emit('listPlayers')}
    socket.on('100Player1', () => {
      score1 += 100
      setScore1Final(score1)
    });
    socket.on('minus75Player1', () => {
      score1 -= 75
      setScore1Final(score1)
    });
    
    socket.on('name1Id', (data) => {
      console.log("name1IdFinal Data: ", data)
      player1Id = data
    })
    socket.on('name2Id', (data) => {
      console.log("name2IdFinal Data: ", data)
      player2Id = data
    })
  }, [])

  return (
      <div className="players__wrapper">
        <div>
          <div className="players__number">Player 1</div>
          <div id="player1" className="players__name1">{`${name1Final}: ${score1Final}`}</div>
        </div>
        
        <div>
          <div className="players__number">Player 2</div>
          <div id="player2" className="players__name2">{`${name2Final}: ${score2Final}`}</div>
        </div>
        {setPlayers()}
      </div>             
  );
}
