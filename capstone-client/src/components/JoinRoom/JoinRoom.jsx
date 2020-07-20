import React, { useState } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import '../../App.scss';
import './JoinRoom.scss';
import Join from '../Join/Join'
// import Instructions from '../Instructions/Instructions'

export default function JoinRoom() {
  // const [text] = useState('');
  const [name2, setName2] = useState('');
  const [room, setRoom] = useState('');
  // const [hideItem, setHideItem] = useState(true);

  // const hideOnClick = () => {
  //   document.getElementById("the-join-room").style.display = "none";
  // }

  const removeElement = () => {
    let element = document.getElementById("the-join-room");
    element.parentNode.removeChild(element)
  }

  // const { speak, voices } = useSpeechSynthesis();
  // const voice = voices[51];

  return (
    <MemoryRouter>
      <div id="the-join-room" className="App">
        <div className="join-room__wrapper">
          <h1 className="join-room__top">Join a Room</h1>
          
          <div className="join-room__bottom">
            <h4 className="join-room__name-title">Enter your name: </h4>
            <input className="join-room__name-input" type="text" onChange={(e) => {setName2(e.target.value)}}></input>
            <h4 className="join-room__code-text">Enter the room: </h4>
            <input className="join-room__code" type="text" onChange={(e) => {setRoom(e.target.value)}}></input>
          </div>

          <Link to="/join">
            <button className="button" onClick={removeElement}>
              Join Room
            </button>
          </Link>  
        </div>
      </div>

        <Switch>
          <Route path="/join" render={() => <Join name2={name2} room={room}/>}/>
        </Switch>
      </MemoryRouter>
  
  );
}
