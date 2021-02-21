import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import "./Home.css";

class Home extends Component {

    render () {
        
        return (
            <div>
                
                <div className="header">
                    <div className="name">Makaan.com</div>
                    <div className="tagline">Let us guide you Home!</div>
                </div>

                <div className="middle">
                    <div className="tabs">
                        <div className="tab">Properties</div>
                        <div className="tab">Chat</div>
                    </div>

                    <div className="methods">
                        <div className="method"><Link to='/rent'>Rent Estimate</Link></div>
                        <div class ="method"><Link to='/rate'>Rate Listing</Link></div>
                    </div>
                </div>

               

            </div>
        );
    }
}

export default Home;