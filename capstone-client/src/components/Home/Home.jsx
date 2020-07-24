import React from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import '../../App.scss';
import './Home.scss';
import Title from '../Title/Title'
import Logo from '../Logo/Logo'
import '../Title/Title.scss'
import '../Logo/Logo.scss'

export default function Home() {
  // const [text, setText] = useState('Welcome to You Dont Know Diddly Squat... I am your host, Prince Abooboo... Are you ready?  Lets go!');
  // const [pitch, setPitch] = useState(1.2)
  // const [rate, setRate] = useState(1.1)
  // const onEnd = () => {setText('Are you hosting today, or joining a game.')};
  // const {speak, cancel, speaking, supported, voices} = useSpeechSynthesis({onEnd});
  // const voice = voices[51];
  // const announce = () => {speak({ text, voice, rate, pitch })}

  const showTitle = () => {
    // announce()
    fadeOut(".logo-image")
    setTimeout(() => {
      document.querySelector(".logo").style.display = "none";
      document.querySelector(".button2").style.display = "none";
      document.querySelector(".title").style.display = "flex";
    }, 1000)
  }

  const fadeOut = (item) => {
    const fadeTarget = document.querySelector(item)
    fadeTarget.classList.add("fade-out");
    fadeTarget.style.opacity = '0'
  }

  return (
      <div className="App">
        <Logo />
        <Title/>
        <button className="button2" onClick={() => {showTitle()}}>Click to start</button>
      </div>
      
  )
}