import React from 'react';

import "./Property.css";

const property = (props) => {
    return (
        <div className="property">
            <p>Address:{props.address}</p><br/>
            <p>Bathrooms:{props.bathrooms}</p><br/>
            <p>Bedrooms:{props.bedrooms}</p><br/>
            <p>SquareFootage:{props.footage}</p><br/>
            <p>County:{props.county}</p><br/>
            <p>Type:{props.type}</p><br/>
            <p>City:{props.city}</p><br/>
            <p>State:{props.state}</p><br/>
            <p>Zipcode:{props.zipcode}</p><br/>
            <p>Price:${props.price}</p><br/>
        </div>
    )
}

export default property
