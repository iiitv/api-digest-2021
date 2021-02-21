import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


import "./Home.css";

class Home extends Component {

    render () {
        
        return (
            <div className="main">
                
                <div className="header">
                    <div className="name">Makaan.com</div>
                    <div className="tagline">Let us guide you Home!</div>
                </div>

                    <div className="methods">
                        <NavLink to='/rent' exact className="method">Rent Estimate</NavLink>
                       <NavLink to='/rate' exact className="method">Rate Listing</NavLink>
                    </div>


            </div>

            
        );
    }
}

export default Home;