import React from 'react';
import { Switch, Route, MemoryRouter } from 'react-router-dom';
import './App.scss';
import Logo from './components/Logo/Logo.jsx';
import Title from './components/Title/Title.jsx';
import Join from './components/Join/Join.jsx';
import Instructions from './components/Instructions/Instructions.jsx';
import QuestionIntro from './components/QuestionIntro/QuestionIntro.jsx';
import Questions from './components/Questions/Questions.jsx';

// const express = require('express')
// const app = express();
// const http = require('http').Server(app).listen(80);
// const io = require('socket.io')(http);
// console.log('[+] Server Started!');
// app.get('/', function(req,res) {
//   res.sendFile(__dirname+'/index.html');
// });
// io.on('connection', function(socket){
//   console.log('[+] A User is Connected!');
//   socket.on('message', function(data) {
//     console.log('[+] Received : ' + data);
//     socket.emit('sendres', data)
//   });
//   socket.on('disconnect', function(){
//     console.log('[+] A user is disconnected!')
//   })
// })

// // SCRIPT
// var socket = io().connect('http://localhost:80');
// var append = "";

// function send(data){
// socket.emit('message',data);
// document.getElementById("sender").value = "";
// };
// socket.on('sendres',function(data){
//     append+= '<br>[+]'+data;
//     document.getElementById('results').innerHTML=append;
// })

export default function App() {
  return (
    <MemoryRouter initialEntries={["/"]} initialIndex={1}>

      {/* <h1>Welcome to the socket io websoket!</h1>
      <input type="text" id="sender" onchange="send(this.value)" placeholder="Send a Message"/>
      <div id="results"></div> */}

      <Switch>
        <Route path="/" exact component={Logo}/>
        <Route path="/title" component={Title}/>
        <Route path="/join" component={Join}/>
        <Route path="/instructions" component={Instructions}/>
        <Route path="/questionintro" component={QuestionIntro}/>
        <Route path="/questions" component={Questions}/>
      </Switch>
    </MemoryRouter>
  );
}