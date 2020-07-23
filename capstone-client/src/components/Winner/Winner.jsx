import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './Winner.scss';
import '../Players/Players'
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);

export default function Winner({winnerName, winnerScore}) {
  return (
      <div className="winner__wrapper">
        <div>
          <h1 className="winner__number">Congratulations!</h1>
          <div id="player" className="winner__name">{winnerName}</div>
          <div id="playerscore" className="winner__score">{winnerScore}</div>
        </div>

      <Link to={`/`}>
        <button id="button__leave-winner" className="button">Start a New Game!</button>
      </Link>  
      </div>             
  );
}
