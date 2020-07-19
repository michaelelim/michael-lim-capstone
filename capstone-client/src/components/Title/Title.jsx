import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { Link } from 'react-router-dom';
import '../../App.scss';
import './Title.scss';

export default function Title() {
  const [text] = useState('Thanks for hosting!  Enter your name and a room name to tell your friends');
  const { speak, voices } = useSpeechSynthesis();
  const voice = voices[51];

  return (
      <div className="App">
        <h1 className="title">You Don't Know Diddly Squat</h1>
        <h3 className="title__sub">A multiplayer quiz show for the whole family!</h3>
        {/* <Link to="/host" onClick={() => {speak({ text, voice })}}> */}
        <Link to="/host">
          <button className="button">Let's Go!</button>
        </Link>        
      </div>
      
  )
}

// window.onload(useSpeechSynthesis({"Hello World", 51}))

      // <form>
      //       <textarea
      //         id="message"
      //         name="message"
      //         rows={3}
      //         value={text}
      //         onChange={(event) => {
      //           setText(event.target.value);
      //         }}
      //       />
      //       {speaking ? (
      //         <button type="button" onClick={cancel}>
      //           Stop
      //         </button>
      //       ) : (
      //         <button
      //           type="button"
      //           onClick={() => speak({ text, voice })}
      //         >
      //           Speak
      //         </button>
      //       )}
      // </form>