import React, { useState, useEffect } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './Join.scss';
import socketIOClient from 'socket.io-client';
import Players from '../Players/Players'

const ENDPOINT = 'http://127.0.0.1:3009';
const STARTPOINT = 'http://127.0.0.1:3000';
const socket = socketIOClient(ENDPOINT);

export default function Join({name, room}) {
  let [name1Final, setName1Final] = useState('');
  let [name2Final, setName2Final] = useState("JOIN NOW!");
  // let [roomfinal, setRoomFinal] = useState(room);
  // let [advanceButton, setAdvanceButton] = useState(false);

  const roomToServer = () => {socket.emit('roomName', room)}
  const name1ToServer = () => {socket.emit('name1', name)}
  // const name2ToServer = () => {socket.emit('name2', name2Final)}
  // const advanceToServer = () => {
  //   console.log("Sending advance call to server")
  //   socket.emit('advanceButton', true)}

  // {name1Final == '' ? setName1Final(name) : setName2Final(name)}

  useEffect(() => {
    socket.on("name1broadcast", data => {setName1Final(data)})
    socket.on("name2broadcast", data => {setName2Final(data)})
    // socket.on("advancebuttonbroadcast", data => {
    //   window.location.href = STARTPOINT + "/instructions/" + name + "/" + room;
    // })
  }, [])

  // const [text] = useState('The instructions are simple!  A question will come up and you have to choose the correct answer on your device.  If you have the most points... you win!');

  // const onEnd = () => {};
  // const { speak, voices } = useSpeechSynthesis();
  // const voice = voices[51];

  return ( 
    <div id="the-join" className="App">
      {roomToServer()}
      {name1ToServer()}
      {/* {name2ToServer()} */}
      <div className="join__wrapper">
        <h1 className="join__left">Who's playing?</h1>
        
        <div className="join__right">
          <h4 className="join__room-title">Room code: </h4>
          <div className="join__room">{room}</div>
        </div>
      </div>

      {/* <div className="join__player-wrapper">
        <div>
          <div className="join__player-number">Player 1</div>
          <div id="player1" className="join__player-name">{name1Final}</div>
        </div>
        
        <div>
          <div className="join__player-number">Player 2</div>
          <div id="player2" className="join__player-name">{name2Final}</div>
        </div>
      </div>   */}

      {/* {document.querySelector(".players__wrapper").style.display = "flex"} */}

      {/* <Link to="/instructions" onClick={() => {speak({ text, voice })}}> */}
      {/* <button className="button" onClick={advanceToServer}>Everyone's here!</button> */}
      {/* <Link to={`/instructions/${name}/${room}`}> */}
      {/* <Link to={`/instructions/${name}/${room}`}> */}
        <button className="button">Everyone's here!</button>
      {/* </Link> */}
      
      
      <Players name1={name1Final} name2={name2Final}/>
    </div>
  );
}
