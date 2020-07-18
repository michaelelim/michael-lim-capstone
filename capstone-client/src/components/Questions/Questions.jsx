import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './Questions.scss';

export default function Questions() {
  const [text, setText] = useState('Question 1... ');
  const onEnd = () => {
    return (
      <Link to="/questions2" component={Questions}/>
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
      <div className="question__wrapper">
        <div className="question__1">The song &quot;Feel Good Inc.&quot; by British band Gorillaz features which hip hop group?</div>
        <div className="question__answer-wrapper">
          <div className="question__letter">A:</div>
          <div className="question__1-answer1">De La Soul</div>
        </div>
        <div className="question__answer-wrapper">
          <div className="question__letter">B:</div>
          <div className="question__1-answer2">Public Enemy</div>
        </div>
        <div className="question__answer-wrapper">
          <div className="question__letter">C:</div>
          <div className="question__1-answer3">OutKast</div>
        </div>
        <div className="question__answer-wrapper">
          <div className="question__letter">D:</div>
          <div className="question__1-answer4">Cypress Hill</div>
        </div>
      </div>


      <div className="join__player-wrapper">
        <div>
          <div className="join__player-number">Player 1</div>
          <div className="join__player-name">Adam</div>
        </div>
        
        <div>
          <div className="join__player-number">Player 2</div>
          <div className="join__player-name">Eve</div>
        </div>
      </div>  
    </div>
  );
}
