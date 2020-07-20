import React from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './Menu.scss';

export default function Menu() {
  // const { speak, voices } = useSpeechSynthesis();
  // const voice = voices[51];

  return (
      <div id="the-menu" className="App">
        <div className="menu__wrapper">
          <h1 className="menu__top">You Don't Know Diddly Squat</h1>          
        </div>
      
        <Link to="/host">
          <button className="button">
            Host a Game
          </button>
        </Link>  

        <Link to="/joinroom">
          <button className="button">
            Join a Game
          </button>
        </Link>  
      </div>
  );
}
