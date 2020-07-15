import React from 'react';
import { Switch, Route, MemoryRouter } from 'react-router-dom';
import './App.scss';
import Logo from './components/Logo/Logo.jsx';
import Title from './components/Title/Title.jsx';
import Join from './components/Join/Join.jsx';
import Instructions from './components/Instructions/Instructions.jsx';
import QuestionIntro from './components/QuestionIntro/QuestionIntro.jsx';
import Questions from './components/Questions/Questions.jsx';

export default function App() {
  return (
    <MemoryRouter initialEntries={["/"]} initialIndex={1}>
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