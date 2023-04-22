import logo from './logo.svg';
import './App.css';
import EnvComponent from './components/EnvComponent';
import React, { createContext, useContext, useState } from 'react';
import TransComponent from './components/TransComponent';

function App() {
  return (
    <div className="App">
      <EnvComponent/>
    </div>
  );
}

export default App;
