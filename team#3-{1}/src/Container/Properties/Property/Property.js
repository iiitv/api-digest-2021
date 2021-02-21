import React from 'react';

import home from "../../../Assets/Images/Home.jpg"

import "./Property.css";

const property = (props) => {
    return (
        <div className="property">
            <img src={home} className="home"/>
            <div>
                <div><span className="field"> Address: </span>{props.address}</div><br/>
                <div><span className="field">Bathrooms:</span> {props.bathrooms}</div><br/>
                <div><span className="field">Bedrooms:</span> {props.bedrooms}</div><br/>
                <div><span className="field">SquareFootage:</span> {props.footage}</div><br/>
                <div><span className="field">County:</span> {props.county}</div><br/>
                <div><span className="field">Type:</span> {props.type}</div><br/>
                <div><span className="field">City:</span> {props.city}</div><br/>
                <div><span className="field">State:</span> {props.state}</div><br/>
                <div><span className="field">Zipcode:</span> {props.zipcode}</div><br/>
                <div><span className="field">Price:</span> {props.price}</div><br/>
            </div>
            
        </div>
    )
}

export default property
