import React, { Component } from 'react';

class Home extends Component {
   

    render () {
        
        return (
            <div>
                
                <div>Website Name</div>

                <div>
                    <div>Properties</div>
                    <div>Chat</div>
                </div>

                <div>
                    <div>Rent Estimate</div>
                    <div>Rate Listing</div>
                </div>

                <div>
                    <input placeholder="CITY"></input>
                    <input placeholder="STATE"></input>
                </div>

                <button>Submit</button>
            </div>
        );
    }
}

export default Home;