import React from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import '../../App.scss';
import './Home.scss';
import Title from '../Title/Title'
import Logo from '../Logo/Logo'
import '../Title/Title.scss'
import '../Logo/Logo.scss'

export default function Home() {
  // const [text] = useState('Welcome to You Dont Know Diddly Squat... I am your host, Prince Abooboo... Are you ready?  Lets go!');
  // const onEnd = () => {
  //   return (
  //     <Link to="/title" component={Title}/>
  //   )
  // };
  // const { speak, voices } = useSpeechSynthesis({onEnd});
  // const voice = voices[51];


  // const fadeOut = (item) => {
  //   const fadeTarget = document.querySelector(item)
  //   fadeTarget.classList.add("fade-out");
  //   fadeTarget.style.opacity = '0'
  // }

  const showTitle = () => {
      document.querySelector(".logo").style.display = "none";
      document.querySelector(".button2").style.display = "none";
      document.querySelector(".title").style.display = "flex";
  }

  return (
      <div className="App">
        <Logo />
        <Title/>

        {/* <Link to="/title"> */}
        {/* <Link to="/title" onClick={() => {
            speak({ text, voice })
            fadeOut(".logo-image")
            fadeOut(".button2")
        }}>Click to start */}

        {/* <button className="button2" onClick={() => {
            speak({ text, voice })
            fadeOut(".logo-image")
            fadeOut(".button2")
          }}> */}
          <button className="button2" onClick={showTitle}>Click to start</button>
        {/* </Link> */}
      </div>
      
  )
}