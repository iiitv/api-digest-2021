import React, { Component } from 'react';

class Home extends Component {
   

    render () {
        
        return (
            <div>

                <div>
                    <input placeholder="compCount"></input>
                    <input placeholder="squareFootage"></input>
                    <input placeholder="bathrooms"></input>
                    <input placeholder="address"></input>
                    <input placeholder="bedrooms"></input>
                    <input placeholder="propertyType"></input>
                </div>

                <button>Submit</button>
            </div>
        );
    }
}

export default Home;