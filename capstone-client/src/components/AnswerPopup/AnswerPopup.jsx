import React from 'react';
import '../../App.scss';
import './AnswerPopup.scss'

export default function Correct() {
  return (
    <div className="correct">
      <h1>CORRECT! YOU GET 100 POINTS!</h1>
    </div>      
  )
}

export function Incorrect() {
  return (
    <div className="incorrect">
      <h1>INCORRECT! YOU LOSE 75 POINTS!</h1>
    </div>      
  )
}