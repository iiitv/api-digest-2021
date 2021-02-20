import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import './App.css';

import Home from "./Container/Home/Home.js"
import Props from "./Container/Properties/Properties.js"

class App extends Component {
    render () {
      return (
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/prop" exact component={Props} />
        </div>
      );
    }
  }

export default App;
