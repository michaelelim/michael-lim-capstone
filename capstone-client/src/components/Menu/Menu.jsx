import React from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import '../../App.scss';
import './Menu.scss';
import Host from '../Host/Host'
import '../Host/Host.scss';
import JoinRoom from '../JoinRoom/JoinRoom'
import '../JoinRoom/JoinRoom.scss';

export default function Menu() {
  // const { speak, voices } = useSpeechSynthesis();
  // const voice = voices[51];

  const showHost = () => {
    document.querySelector("#the-menu").style.display = "none"
    document.querySelector(".button__host").style.display = "none"
    document.querySelector(".button__join-room").style.display = "none"
    document.querySelector(".host__wrapper").style.display = "flex"
  }

  const showJoinRoom = () => {
    document.querySelector("#the-menu").style.display = "none"
    document.querySelector(".button__host").style.display = "none"
    document.querySelector(".button__join-room").style.display = "none"
    document.querySelector(".join-room__wrapper").style.display = "flex"
  }

  return (
    <div>
      <div id="the-menu" className="App">
        <div className="menu__wrapper">
          <h1 className="menu__top">You Don't Know Diddly Squat</h1>          
        </div>
      
        <button className="button button__host" onClick={showHost}>Host a Game</button>
        <button className="button button__join-room" onClick={showJoinRoom}>Join a Game</button>
      </div>

      <Host/>
      <JoinRoom />
    </div>
  );
}
