import React, { Component } from 'react';
import Properties from '../../Container/Properties/Properties';

import "./RentEstimate.css"
class Home extends Component {
    state={
        properties:null,
        flag:1,
        city:this.props.city,
        State:this.props.State
    }
   
    clickHandler=()=>{
        this.setState({
            properties:<Properties
            flag={this.state.flag}
            city={this.state.city}
            State={this.state.State}
            />
        })
    }

    changeHandler=({target})=>{
        this.setState({ [target.name]: target.value });
        console.log(this.state)
    }


    render () {
        let properties=this.state.properties
        return (
            <div className="rent">


                <div className="inputs">
                    <input placeholder="CITY" name="city" onChange={this.changeHandler} className="input"></input><br/>
                    <input placeholder="STATE" name="State" onChange={this.changeHandler} className="input"></input>
                </div>
                <button onClick={this.clickHandler} className="submit">Submit</button>
                {properties}

            </div>
        );
    }
}

export default Home;