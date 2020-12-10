import React, { useState, useEffect } from 'react';
import Controller from './Controller/Controller.js';
import './App.css';
import axios from 'axios'

const App = () => {
  const [response, setResponse] = useState({})
  
  useEffect(() => {
    axios.get('/api/v1/test-case').then((res) => {
      console.log(res)
      const response = res.data;
      setResponse(response);
    });
  }, [])

  return (
    <>
      <Controller />
    </>
  );
}

export default App;
