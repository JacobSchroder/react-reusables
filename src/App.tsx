import React from 'react';
import './App.css';
import {Select} from "./components/Select";

const options = {
    1 : "en",
    2 : "to",
    3 : "tre"
}

function App() {
  return (
    <div className="App">
      <Select options={options} placeholder={'vælg nu'}>
        Hey there
      </Select>
    </div>
  );
}

export default App;
