import React from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
  let spotify_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
  let spotify_secret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
  return (
    <div className="App">


    <p className="text-4xl underline">
    {spotify_secret}
    </p>
    <p className="italic ...">
    {spotify_id}
    </p>

    </div>
  );
}

export default App;
