import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './Join.scss';

export default function Join() {
  return (
    <div className="App">
      <div className="join__wrapper">
        <h1 className="join__left">Who's playing?</h1>
        
        <div className="join__right">
          <h4 className="join__text">Connect now to the site, and use the code: </h4>
          <div className="join__code">AB12</div>
        </div>
      </div>

      <div className="join__player-wrapper">
        <div>
          <div className="join__player-number">Player 1</div>
          <div className="join__player-name">Adam</div>
        </div>
        
        <div>
          <div className="join__player-number">Player 2</div>
          <div className="join__player-name">Eve</div>
        </div>
      </div>  

      <Link to="/instructions"><button className="button">Everyone's here!</button></Link>
    </div>
  );
}
