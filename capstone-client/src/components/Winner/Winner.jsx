import React from 'react';
import '../../App.scss';
import './Winner.scss';
import '../Players/Players'

export default function Winner({winnerName, winnerScore}) {

  console.log("winnerName: ", winnerName)
  console.log("winnerScore: ", winnerScore)
  return (
      <div className="winner__wrapper">
        <div>
          <h1 className="winner__number">Congratulations!</h1>
          <div id="player" className="winner__name">{winnerName}</div>
          <div id="playerscore" className="winner__score">{winnerScore}</div>
        </div>
      </div>             
  );
}
