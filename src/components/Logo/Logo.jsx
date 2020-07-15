import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import LogoImage from "../../assets/Logo/LimboStudios.svg"
import Title from '../../components/Title/Title'
import '../../App.scss';
import './Logo.scss';

export default function Logo() {
  const [text] = useState('Welcome to You Dont Know Diddly Squat... I am your host, Prince Abooboo... Are you ready?  Lets go!');
  const onEnd = () => {
    return (
      <Link to="/title" component={Title}/>
    )
  };
  const { speak, voices } = useSpeechSynthesis({onEnd});
  const voice = voices[51];


  const fadeOut = (item) => {
    const fadeTarget = document.querySelector(item)
    fadeTarget.classList.add("fade-out");
    fadeTarget.style.opacity = '0'
  }

  return (
      <div className="App">
        <img className="logo-image" src={LogoImage} alt="Limbo Productions logo."/>        
        <Link to="/title">
        {/* <Link to="/title" onClick={() => {
            speak({ text, voice })
            fadeOut(".logo-image")
            fadeOut(".button2")
        }}>Click to start */}

          <button className="button2" onClick={() => {
            speak({ text, voice })
            fadeOut(".logo-image")
            fadeOut(".button2")
          }}>Click to start</button>
        </Link>
        
      </div>
      
  )
}