import React, { useState, useEffect } from 'react';
import '../../App.scss';
import './Players.scss';
import Winner from '../Winner/Winner'

export default function Players({ room, socket, clientId }) {
  const [players, setPlayers] = useState([]) // [ { name: 'jim', score: 0, clientId: 'xyz' }, {} ]
  let [winnerName, setWinnerName] = useState('')
  let [winnerScore, setWinnerScore] = useState(0)
  // const [playerOne, setPlayerOne] = useState({}); // { name, score, id: clientId }
  // const [playerTwo, setPlayerTwo] = useState({}); // { name, score, id: clientId }

  useEffect(() => {
    const fadeOut = (item) => {
      const fadeTarget = document.querySelector(item)
      fadeTarget.classList.add("fade-out");
      fadeTarget.style.opacity = '0'
    }

    const showWinner = () => {
      fadeOut(".players__wrapper")
      setTimeout(() => {
        document.querySelector("#question-wrapper").style.display = "none"
        document.querySelector(".players__wrapper").style.display = "none"
        document.querySelector(".winner__wrapper").style.display = "block"
        {socket.emit('resetRoom', room)}
      }, 1000)
    }    

    if (socket) {
      // socket.on('p1Broadcast', (data) => {
      //   console.log("p1 updated: ", data)
      //   p1.name = data.name
      //   p1.id = data.clientId
      //   // p1.score = data[0].score
      //   p1.room = data.room
      // })
  
      // socket.on('p2Broadcast', (data) => {
      //   if (data.length !== 0) {
      //     console.log("p2 updated: ", data)
      //     p2.name = data.name
      //     p2.id = data.clientId
      //     // p2.score = data[0].score
      //     p2.room = data.room
      //   }
      // })
  
      // socket.on('100Player1', (name, score) => {
      //   // p1.score += 100
      //   setScore1Final(score)
      //   // setScore1Final(p1.score)
      // });
      // socket.on('minus75Player1', (name, score) => {
      //   // p1.score -= 75
      //   setScore1Final(score)
      // });
      // socket.on('100Player2', (name, score) => {
      //   // p2.score += 100
      //   setScore2Final(score)
      // });
      // socket.on('minus75Player2', (name, score) => {
      //   // p2.score -= 75
      //   setScore2Final(score)
      // });
  
      // socket.on('advanceToWinner', (winnerName, winnerScore) => {
      //   // if (p1.score > p2.score) {
      //     setWinnerName(winnerName)
      //     setWinnerScore(winnerScore)
      //   // } else if (p1.score < p2.score) {
      //   //   setWinnerName(p2.name)
      //   //   setWinnerScore(p2.score)
      //   // } else if (p1.score === p2.score) {
      //   //   setWinnerName("It's a TIE!")
      //   //   setWinnerScore(p1.score)
      //   // }
      //   showWinner()
      // })
    }
  }, [socket])

  return (
    <section className="players__section">
      <Winner winnerName={winnerName} winnerScore={winnerScore} room={room} />
      <div className="players__wrapper">
        {players.map((player, i) => {
          return (
            <div>
              <div className="players__number">`Player ${i+1}`</div>
              <div id={`player${i}`} className={`players_name${i}`}>{`${player.name}: ${player.score}`}</div>
            </div>    
          )
        })}
      </div>             
    </section>
  );
}
