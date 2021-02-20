import React, { Component } from 'react';

class Home extends Component {
   

    render () {
        
        return (
            <div>

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