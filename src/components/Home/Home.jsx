import React from 'react';
import '../../App.scss';
import './Home.scss';
import Title from '../Title/Title'
import Logo from '../Logo/Logo'
import '../Title/Title.scss'
import '../Logo/Logo.scss'

export default function Home() {

  const showTitle = () => {
    setTimeout(() => {
      document.querySelector(".logo").style.display = "none";
      document.querySelector(".button2").style.display = "none";
      document.querySelector(".title").style.display = "flex";      
    }, 1000)
  }

  return (
      <div className="App">
        <Logo />
        <Title/>
        <button className="button2 coolBeans" onClick={() => {showTitle()}}>Click to start</button>
        <div className="bokeh-background"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
      </div>
      
  )
}