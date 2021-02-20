import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                    <div ><Link to='/rent'>Rent Estimate</Link></div>
                    <div><Link to='/rate'>Rate Listing</Link></div>
                </div>

            </div>
        );
    }
}

export default Home;