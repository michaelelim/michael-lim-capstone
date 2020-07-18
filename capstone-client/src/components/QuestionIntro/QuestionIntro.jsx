import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import Questions from '../Questions/Questions'
import '../../App.scss';
import './QuestionIntro.scss';

export default function QuestionIntro() {  
  const [text, setText] = useState(
    'First Question...  The song...Feel Good Ink... by British band Gorillaz features which hip hop group?  Is it A... De La Soul...  B... Public Enemy... C... Outkast... Or D... Cypress Hill'
    );
  const onEnd = () => {
    return (
      <Link to="/questions" component={Questions}/>
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
      <h1 className="question-intro__title">Question 1</h1>
      <Link to="/questions">
        <button className="button2" onClick={() => {
          speak({ text, voice })
          fadeOut(".question-intro__title")
        }}>Next</button>
      </Link>
    </div>
  );
}
