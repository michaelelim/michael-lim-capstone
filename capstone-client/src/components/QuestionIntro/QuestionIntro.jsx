import React, {useEffect} from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
// import Questions from '../Questions/Questions'
import '../../App.scss';
import './QuestionIntro.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);

export default function QuestionIntro() {  
  // const [text] = useState(
  //   'First Question...  The song...Feel Good Ink... by British band Gorillaz features which hip hop group?  Is it A... De La Soul...  B... Public Enemy... C... Outkast... Or D... Cypress Hill'
  //   );
  // const onEnd = () => {
  //   return (
  //     <Link to="/questions" component={Questions}/>
  //   )
  // };
  // const { speak, voices } = useSpeechSynthesis({onEnd});
  // const voice = voices[51];

  const advanceToServer = () => {
    socket.emit('advanceButton', "goToQuestions")}

    useEffect(() => {
      socket.on("advanceToQuestions", () => {showQuestions()})
    }, [])

    const showQuestions = () => {
      document.querySelector("#question-intro").style.display = "none"
      document.querySelector("#button__leave-question-intro").style.display = "none"
      document.querySelector("#question-wrapper").style.display = "flex"
      document.querySelector(".players__wrapper").style.display = "flex"
    }

  // const fadeOut = (item) => {
  //   const fadeTarget = document.querySelector(item)
  //   fadeTarget.classList.add("fade-out");
  //   fadeTarget.style.opacity = '0'
  // }

  return (
    <div id="question-intro" className="App">
      <h1 className="question-intro__title">Question 1</h1>
      {/* <Link to="/questions"> */}
        {/* <button className="button2" onClick={() => {
          speak({ text, voice })
          fadeOut(".question-intro__title")
        }}> */}
        <button id="button__leave-question-intro" className="button2" onClick={advanceToServer}>Next</button>
      {/* </Link> */}
    </div>
  );
}
