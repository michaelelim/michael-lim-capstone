import React from 'react';
import { Switch, Route, MemoryRouter } from 'react-router-dom';
import './App.scss';
import Title from './components/Title/Title.jsx';
import Join from './components/Join/Join.jsx';
import Instructions from './components/Instructions/Instructions.jsx';

export default function App() {
  return (
    <MemoryRouter initialEntries={["/title"]} initialIndex={1}>
      <Switch>
        <Route path="/" exact><Title/></Route>
        <Route path="/title"><Title/></Route>
        <Route path="/join"><Join/></Route>
        <Route path="/instructions"><Instructions /></Route>
      </Switch>
    </MemoryRouter>
  );
}