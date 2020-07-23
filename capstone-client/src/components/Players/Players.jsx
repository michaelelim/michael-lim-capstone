import React, { useState, useEffect } from 'react';
import '../../App.scss';
import './Players.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);
let p1 = {name: "", id: "", score: 0, room: ""}
let p2 = {name: "", id: "", score: 0, room: ""}
let player1 = '';
let player2 = '';
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
    if (name1Final !== null) {socket.on("name1Broadcast", data => {setName1Final(data)})} //listen for name1broadcast
    if (name2Final !== "JOIN NOW!") {socket.on("name2Broadcast", data => {setName2Final(data)})} //listen for name2broadcast
    if (name1Final === "" && name2Final === "") {socket.emit('listPlayers')}

    socket.on('p1Broadcast', (data) => {
      p1.name = data.name
      p1.id = data.id
      p1.score = data.score
      p1.room = data.room
      console.log(p1)
    })

    socket.on('p2Broadcast', (data) => {
      p2.name = data.name
      p2.id = data.id
      p2.score = data.score
      p2.room = data.room
      console.log(p2)
    })

    socket.on('100Player1', (data) => {
      p1.score += 100
      console.log("Points +100 for p1: ", p1)
      setScore1Final(p1.score)
    });
    socket.on('minus75Player1', (data) => {
      p1.score -= 75
      console.log("Points -75 for p1: ", p1)
      setScore1Final(p1.score)
    });
    socket.on('100Player2', (data) => {
      p2.score += 100
      console.log("Points +100 for p2: ", p2)
      setScore2Final(p2.score)
    });
    socket.on('minus75Player2', (data) => {
      p2.score -= 75
      console.log("Points -75 for p1: ", p2)
      setScore2Final(p2.score)
    });
    
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
