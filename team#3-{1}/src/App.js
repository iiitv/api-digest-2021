import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import './App.css';

import Home from "./Container/Home/Home.js"
// import Props from "./Container/Properties/Properties.js"
import Rate from "./Components/RateListing/RateListing"
import Rent from "./Components/RentEstimate/RentEstimate"
import Chat from "./Container/Chat/Chat"

class App extends Component {
    render () {
      return (
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/rate" exact component={Home} />
          <Route path="/rent" exact component={Home} />
          <Route path="/rate" exact component={Rate} />
          <Route path="/rent" exact component={Rent} />
          <Route path="/chat" exact component={Chat} />
        </div>
      );
    }
  }

export default App;
