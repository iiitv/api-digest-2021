import React, { Component } from 'react';
import Properties from '../../Container/Properties/Properties';

class Home extends Component {
   
    state={
        properties:null,
        flag:0,
        city:this.props.city,
        State:this.props.State,
        bathrooms:this.props.bathrooms,
        address:this.props.address,
        bedrooms:this.props.bedrooms,
        propertyType:this.props.propertyType,
        squareFootage:this.props.footage,
        compCount:this.props.compCount,
    }
   
    clickHandler=()=>{
        this.setState({
            properties:<Properties
            flag={this.state.flag}
            city={this.state.city}
            State={this.state.State}
            bathrooms={this.state.bathrooms}
            address={this.state.address}
            bedrooms={this.state.bedrooms}
            propertyType={this.state.propertyType}
            squareFootage={this.state.footage}
            compCount={this.state.compCount}
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
            <div>
                <div>
                    <input placeholder="compCount" name="compCount" onChange={this.changeHandler}></input>
                    <input placeholder="squareFootage" name="squareFootage" onChange={this.changeHandler}></input>
                    <input placeholder="bathrooms" name="bathrooms"  onChange={this.changeHandler}></input>
                    <input placeholder="address" name="address" onChange={this.changeHandler}></input>
                    <input placeholder="bedrooms" name="bedrooms" onChange={this.changeHandler}></input>
                    <input placeholder="propertyType" name="propertyType"  onChange={this.changeHandler}></input>
                    <input placeholder="State" name="State"  onChange={this.changeHandler}></input>
                    <input placeholder="City" name="city"  onChange={this.changeHandler}></input>
                </div>

                <button onClick={this.clickHandler}>Submit</button>
                {properties}
            </div>

        );
    }
}

export default Home;