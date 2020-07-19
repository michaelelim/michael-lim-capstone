import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { MemoryRouter, Switch, Route, Link } from 'react-router-dom';
import '../../App.scss';
import './Host.scss';
import Join from '../Join/Join'

export default function Host() {
  const [text] = useState('Whos Playing? Tell your friends to join with the code below and press everyone is here when ready');
  const [name1, setName1] = useState('');
  const [room, setRoom] = useState('');
  const [hideItem, setHideItem] = useState(true);

  const hideOnClick = () => {
    document.getElementById("the-host").style.display = "none";
    // setHideItem(false)
  }
  const { speak, voices } = useSpeechSynthesis();
  const voice = voices[51];

  return (
    <MemoryRouter>
      <div id="the-host" className="App">
        <div className="host__wrapper">
          <h1 className="host__top">Host Settings</h1>
          
          <div className="host__bottom">
            <h4 className="host__name-title">Enter your name: </h4>
            <input className="host__name-input" type="text" onChange={(e) => {setName1(e.target.value)}}></input>
            <h4 className="host__code-text">Create a room name: </h4>
            <input className="host__code" type="text" onChange={(e) => {setRoom(e.target.value)}}></input>
          </div>
        </div>
      
        <Link to="/join">
          <button className="button" onClick={hideOnClick}>
            Create Room
          </button>
        </Link>  
      </div>

      <Switch>
        <Route path="/join" render={() => <Join name1={name1} room={room}/>}/>
      </Switch>

    </MemoryRouter>
  );
}
