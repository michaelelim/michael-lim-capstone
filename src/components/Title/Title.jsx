import React from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './Title.scss';


export default function Title() {
  // const [text, setText] = useState('Are you hosting or joining a game');
  // const {speak, voices} = useSpeechSynthesis();
  // const voice = voices[51];

  // const announce = () => {speak({ text, voice })}

  return (
      <div className="title">
        <h1 className="animate__animated animate__tada title__title">You Don't Know Diddly Squat</h1>
        <h3 className="title__sub">A multiplayer quiz show for the whole family!</h3>
        <Link to="/menu">
          <button className="button" >Let's Go!</button>
        </Link>        
      </div>
  )
}