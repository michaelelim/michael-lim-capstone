import React from 'react';
import { Link } from 'react-router-dom';
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
          <h1 className="winner__number">Congratulations!</h1>
          <div id="player" className="winner__name">{winnerName}</div>
          <div id="playerscore" className="winner__score">{winnerScore}</div>
        </div>

        <button id="button__leave-winner" className="button" onClick={refreshBrowser}>Start a New Game!</button>
      </div>             
  );
}
