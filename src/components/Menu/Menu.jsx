import React from 'react';
import '../../App.scss';
import './Menu.scss';
import Host from '../Host/Host'
import '../Host/Host.scss';
import JoinRoom from '../JoinRoom/JoinRoom'
import '../JoinRoom/JoinRoom.scss';

export default function Menu() {
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
    <div className="App">
      <div id="the-menu">
        <div className="menu__wrapper">
          <h1 className="animate__animated animate__backInDown menu__top">You Don't Know Diddly Squat</h1>          
        </div>
      
        <button className="animate__animated button button__host coolBeans" onClick={showHost}>Host a Game</button>
        <button className="button button__join-room coolBeans" onClick={showJoinRoom}>Join a Game</button>
      </div>

      <Host/>
      <JoinRoom />
      <div className="bokeh-background"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
    </div>
  );
}
