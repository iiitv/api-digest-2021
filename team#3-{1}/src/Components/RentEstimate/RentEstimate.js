import React, { Component } from 'react';

import "./RentEstimate.css"
class Home extends Component {
   

    render () {
        
        return (
            <div>

                <div className="rent_inputs">
                    <input placeholder="CITY" className="rent_input"></input>
                    <input placeholder="STATE" className="rent_input"></input>
                </div>

                <button className="submit">Submit</button>
            </div>
        );
    }
}

export default Home;