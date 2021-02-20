import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import './App.css';

import Home from "./Container/Home/Home.js"
// import Props from "./Container/Properties/Properties.js"
import Rate from "./Components/RateListing/RateListing"
import Rent from "./Components/RentEstimate/RentEstimate"

class App extends Component {
    render () {
      return (
        <div>
          <Route path="/" component={Home} />
          <Route path="/rate" exact component={Rate} />
          <Route path="/rent" exact component={Rent} />
          {/* <Route path="/prop" exact component={Props} /> */}
        </div>
      );
    }
  }

export default App;
