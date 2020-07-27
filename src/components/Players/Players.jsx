import React, { useState, useEffect } from 'react';
import '../../App.scss';
import './Players.scss';
import Winner from '../Winner/Winner'

export default function Players({ room, socket, clientId }) {
  const [players, setPlayers] = useState([{}]) // [ { name: 'jim', score: 0, clientId: 'xyz' }, {} ]
  let [winnerName, setWinnerName] = useState('')
  let [winnerScore, setWinnerScore] = useState(0)

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
        socket.emit('resetRoom', room)
      }, 1000)
    }    

    if (socket) {
      socket.on('pBroadcast', (data) => {setPlayers(data)})
      socket.on('100Player1', (data) => {setPlayers(data)})   
      socket.on('minus75Player1', (data) => {setPlayers(data)})   
      socket.on('100Player2', (data) => {setPlayers(data)})
      socket.on('minus75Player2', (data) => {setPlayers(data)});
  
      socket.on('advanceToWinner', (winnerName, winnerScore) => {
        setWinnerName(winnerName)
        setWinnerScore(winnerScore)
        showWinner()
      })
    }
  }, [socket, room])

  return (
    <section className="players__section">
      <Winner winnerName={winnerName} winnerScore={winnerScore} room={room} />     
      <div className="players__wrapper">        
        {players.map((player, i) => {
          return (
            <div>
              <div className="players__number">{`Player ${i+1}`}</div>
              <div id={`player${i}`} className={`players__name${i}`}>{`${player.name}: ${player.score}`}</div>
            </div>   
          )
        })}
      </div>
    </section>
  );
}