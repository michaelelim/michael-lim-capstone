import React from 'react';
import '../../App.scss';
import './Instructions.scss';

export default function Instructions() {
  return (
    <div className="App">
      <div className="instructions__wrapper">
        <h1 className="instructions__title">Instructions</h1>
      </div>

      <div className="instructions__wrapper-question">
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

      <button className="button">We get it! Let's go!</button>
    </div>
  );
}
