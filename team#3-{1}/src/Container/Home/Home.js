import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// import Chat from '../Chat/Chat'


import "./Home.css";

class Home extends Component {

    render () {
        
        return (
            <div className="main">
                
                <div className="header">
                    <div className="name">Makaan.com</div>
                    <div className="tagline">Let us guide you Home!</div>
                </div>

                <div className="search">Search By</div>

                <div className="methods">
                    <NavLink to='/rent' exact className="method">City & State</NavLink>
                    <NavLink to='/rate' exact className="method">Home Details</NavLink>
                </div>

                {/* <Chat /> */}


            </div>

            
        );
    }
}

export default Home;