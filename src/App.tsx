import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import {Buffer} from 'buffer';
import axios from 'axios';


interface AuthenticationResponse {
  access_token: string,
  token_type: string,
  expires_in: string
};

interface props {
  authentication: any
};


const Authentication = async () => {
  var encodedAuth = new Buffer(process.env.REACT_APP_SPOTIFY_CLIENT_ID + ":" + process.env.REACT_APP_SPOTIFY_CLIENT_SECRET).toString("base64");

  var bearer: AuthenticationResponse = {
    access_token: "",
    token_type: "",
    expires_in: ""
  }

  var response: any = await axios.post('https://accounts.spotify.com/api/token', 
    {'grant_type': 'client_credentials'},
    {headers: {'Authorization': 'Basic ' + encodedAuth, 'content-type': 'application/x-www-form-urlencoded'}
  })
  .then(res => bearer = res.data)
  .catch(res => console.log(res))
  return bearer.access_token
}


function Playlists(authentication: props) {
  console.log(authentication)
  return (
    <div className="Playlists">
      <h1>{}</h1>
    </div>
    );
}

function Categories(authentication: any) {
  return (
    <div className="Categories">
      <h1>Categories</h1>
    </div>
    );
}

function Releases(authentication: any) {
  const data = fetch(process.env.REACT_APP_SPOTIFY_API + `/browse/new-releases`, {
    method: 'GET',

  })

  return (
    <div className="Releases">
      <h1>Releases</h1>
    </div>
    );
}



class App extends React.Component <any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      date: new Date(),
      Base64Auth: Authentication()
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render(){
    return (
      <div className="App">

        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <div className="h-56 grid grid-cols-3 gap-4 content-center ...">
                <div>
                  
                </div>

                <div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white m-auto">
                    <a href="/playlists" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        Playlists
                    </a>
                    <a href="/categories" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        Categories
                    </a>
                    <a href="/releases" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                        Releases
                    </a>
                </div>
                  {this.state.date}

                <div>
                  
                </div>
               </div>

            }/>
            <Route path="/playlists" element={
              <Playlists authentication={this.state.Base64Auth}/>
            }/>
            <Route path="/categories" element={
              <Categories/>
            }/>
            <Route path="/releases" element= {
              <Releases/>
            }/>
          </Routes>
        </BrowserRouter>


      </div>
    );
   }
}

export default App;
