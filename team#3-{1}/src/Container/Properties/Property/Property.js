import React from 'react';

import "./Property.css";

const property = (props) => {
    return (
        <div className="property">
            <p>Address:{props.address}</p>
            <p>Bathrooms:{props.bathrooms}</p>
            <p>Bedrooms:{props.bedrooms}</p>
            <p>SquareFootage:{props.footage}</p>
            <p>County:{props.county}</p>
            <p>Type:{props.type}</p>
            <p>City:{props.city}</p>
            <p>State:{props.state}</p>
            <p>Zipcode:{props.zipcode}</p>
            <p>Price:${props.price}</p>
        </div>
    )
}

export default property
