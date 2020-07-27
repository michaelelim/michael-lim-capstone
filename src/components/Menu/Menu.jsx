import React from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import '../../App.scss';
import './Menu.scss';
import Host from '../Host/Host'
import '../Host/Host.scss';
import JoinRoom from '../JoinRoom/JoinRoom'
import '../JoinRoom/JoinRoom.scss';

export default function Menu() {
  // const [text, setText] = useState('');
  // const [pitch, setPitch] = useState(1.2)
  // const [rate, setRate] = useState(1.1)
  // const onEnd = () => {setText('Are you hosting today, or joining a game.')};
  // const {speak, cancel, speaking, supported, voices} = useSpeechSynthesis({onEnd});
  // const voice = voices[51];
  // const announce = () => {speak({ text, voice, rate, pitch })}

  const showHost = () => {
    // setText('I see youre a host... Enter the info and click Create Room')
    document.querySelector("#the-menu").style.display = "none"
    document.querySelector(".button__host").style.display = "none"
    document.querySelector(".button__join-room").style.display = "none"
    document.querySelector(".host__wrapper").style.display = "flex"
  }

  const showJoinRoom = () => {
    // setText('Alright... Type in your name, the correct room name, and join')
    document.querySelector("#the-menu").style.display = "none"
    document.querySelector(".button__host").style.display = "none"
    document.querySelector(".button__join-room").style.display = "none"
    document.querySelector(".join-room__wrapper").style.display = "flex"
  }

  // useEffect(() => {
  //   announce()
  // })

  return (
    <div>
      <div id="the-menu" className="App">
        <div className="menu__wrapper">
          <h1 className="animate__animated animate__backInDown menu__top">You Don't Know Diddly Squat</h1>          
        </div>
      
        <button className="animate__animated button button__host coolBeans" onClick={showHost}>Host a Game</button>
        <button className="button button__join-room coolBeans" onClick={showJoinRoom}>Join a Game</button>
      </div>

      <Host/>
      <JoinRoom />
    </div>
  );
}
