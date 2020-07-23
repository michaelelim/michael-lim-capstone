import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.scss';
import Home from './components/Home/Home.jsx';
// import Title from './components/Title/Title.jsx';
import Menu from './components/Menu/Menu.jsx';
import Host from './components/Host/Host.jsx';
import JoinRoom from './components/JoinRoom/JoinRoom.jsx';
import Join from './components/Join/Join.jsx';
import Instructions from './components/Instructions/Instructions.jsx';
import QuestionIntro from './components/QuestionIntro/QuestionIntro.jsx';
import Questions from './components/Questions/Questions.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={props => (<Home {... props}/>)}/>
        <Route path="/menu" render={props => <Menu {... props}/>}/>
        {/* <Route path="/host" render={props => <Host {... props}/>}/>
        <Route path="/joinroom" render={props => <JoinRoom {... props}/>}/> */}
        <Route path="/join" exact render={props => <Join {... props}/>}/>
        <Route path="/join/:name/:room" render={props => {
          return (<Join 
            room={props.match.params.room}
            name={props.match.params.name}
          />)}}/>
        <Route path="/instructions/:name/:room" render={props => {
          return (<Instructions 
            room={props.match.params.room}
            name={props.match.params.name}
          />)}}/>
        <Route path="/questionintro" component={QuestionIntro}/>
        <Route path="/questions" component={Questions}/>
      </Switch>
    </BrowserRouter>
  );
}