import { findAllByTitle } from '@testing-library/react';
import {TitleBar} from './TitleBar.js';
import {NavPane} from './NavPane.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <TitleBar />
      <NavPane />
    </div>
  );
}

export default App;
