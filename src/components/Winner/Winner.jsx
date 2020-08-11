import React from 'react';
import '../../App.scss';
import './Winner.scss';
import '../Players/Players'

export default function Winner({winnerName, winnerScore, room}) {
  const refreshBrowser = () => {
    window.location.reload(true)
  }

  return (
      <div className="winner__wrapper">
        <div>
          <h1 className="animate__animated animate__flip winner__number">Congrats!</h1>
          <div id="player" className="winner__name">{winnerName}</div>
          <div id="playerscore" className="winner__score">{winnerScore}</div>
        </div>

        <button id="button__leave-winner" className="button coolBeans" onClick={refreshBrowser}>Start a New Game</button>
      </div>             
  );
}
