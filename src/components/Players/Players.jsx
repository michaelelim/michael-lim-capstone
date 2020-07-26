import React, { useState, useEffect } from 'react';
import '../../App.scss';
import './Players.scss';
import socketIOClient from 'socket.io-client';
import Winner from '../Winner/Winner'

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT, {
  transports: ['websocket'], 
  reconnectionAttempts: 3,
  reconnectionDelay: 3000
});
let p1 = {name: "", id: "", room: "", score: 0}
let p2 = {name: "", id: "", room: "", score: 0}
let player1 = '';
let player2 = '';
let score1 = 0;
let score2 = 0;

export default function Players(room) {
  let [name1Final, setName1Final] = useState(player1);
  let [name2Final, setName2Final] = useState(player2);
  let [score1Final, setScore1Final] = useState(score1);
  let [score2Final, setScore2Final] = useState(score2);
  let [winnerName, setWinnerName] = useState('')
  let [winnerScore, setWinnerScore] = useState(0)

  const setPlayers = () => {
    if (player1 !== "" || player2 !== "") {
    player1 = p1.name
    player2 = p2.name
    score1 = score1Final
    score2 = score2Final
    }
  }

  useEffect(() => {
    const showWinner = () => {
      fadeOut(".players__wrapper")
      setTimeout(() => {
        document.querySelector("#question-wrapper").style.display = "none"
        document.querySelector(".players__wrapper").style.display = "none"
        document.querySelector(".winner__wrapper").style.display = "block"
      }, 1000)
    }    
    
    if (name1Final !== null) {socket.on("name1Broadcast", data => {
      console.log("data: ", data)
      console.log("room: ", room)
      console.log("updated name1")
      setName1Final(data)})}
    if (name2Final !== "JOIN NOW!") {socket.on("name2Broadcast", data => {
      console.log("updated name2")
      setName2Final(data)})}
    if (name1Final === "" && name2Final === "") {socket.emit('listPlayers')}

    socket.on('p1Broadcast', (data) => {
      console.log("p1 updated: ", data)
      p1.name = data[0].name
      p1.id = data[0].clientId
      p1.score = data[0].score
      p1.room = data[0].room
    })

    socket.on('p2Broadcast', (data) => {
      if (data.length !== 0) {
        console.log("p2 updated: ", data)
        p2.name = data[0].name
        p2.id = data[0].clientId
        p2.score = data[0].score
        p2.room = data[0].room
      }
    })

    socket.on('100Player1', () => {
      p1.score += 100
      setScore1Final(p1.score)
    });
    socket.on('minus75Player1', () => {
      p1.score -= 75
      setScore1Final(p1.score)
    });
    socket.on('100Player2', () => {
      p2.score += 100
      setScore2Final(p2.score)
    });
    socket.on('minus75Player2', () => {
      p2.score -= 75
      setScore2Final(p2.score)
    });

    socket.on('advanceToWinner', () => {
      if (p1.score > p2.score) {
        setWinnerName(p1.name)
        setWinnerScore(p1.score)
      } else if (p1.score < p2.score) {
        setWinnerName(p2.name)
        setWinnerScore(p2.score)
      } else if (p1.score === p2.score) {
        setWinnerName("It's a TIE!")
        setWinnerScore(p1.score)
      }
      showWinner()
    })
  }, [name1Final, name2Final])

  const fadeOut = (item) => {
    const fadeTarget = document.querySelector(item)
    fadeTarget.classList.add("fade-out");
    fadeTarget.style.opacity = '0'
  }

  return (
    <section className="players__section">
      <Winner winnerName={winnerName} winnerScore={winnerScore} />
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
    </section>
  );
}
