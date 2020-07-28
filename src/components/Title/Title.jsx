import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './Title.scss';


export default function Title() {

  return (
      <div className="title">
        <h1 className="animate__animated animate__tada title__title">You Don't Know Diddly Squat</h1>
        <h3 className="title__sub">A multiplayer quiz show for the whole family!</h3>
        <Link to="/menu">
          <button className="button coolBeans">Let's Go!</button>
        </Link>        
      </div>
  )
}