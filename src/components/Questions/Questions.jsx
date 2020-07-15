import React from 'react';
import '../../App.scss';
import './Questions.scss';

export default function Questions() {
  return (
    <div className="App">
      <div className="question__wrapper">
        <div className="question__0">What is the capital of a fake question?</div>
        <div className="question__answer-wrapper">
          <div className="question__letter">A:</div>
          <div className="question__0-answer1">Fakesville, USA</div>
        </div>
        <div className="question__answer-wrapper">
          <div className="question__letter">B:</div>
          <div className="question__0-answer2">42</div>
        </div>
        <div className="question__answer-wrapper">
          <div className="question__letter">C:</div>
          <div className="question__0-answer3">When in doubt, pick C</div>
        </div>
        <div className="question__answer-wrapper">
          <div className="question__letter">D:</div>
          <div className="question__0-answer4">None of the above</div>
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
