import React from 'react';

import "./Property.css";

const property = (props) => {
    return (
        <div className="property">
            <div className="prop">
                <p>Address:{props.address}</p>
                <p>Bathrooms:{props.bathrooms}</p>
                <p>Bedrooms:{props.bedrooms}</p>
                <p>SquareFootage:{props.footage}</p>
                <p>County:{props.county}</p>
                <p>Type:{props.type}</p>
            </div>
            <div className="prop">
                <p>City:{props.city}</p>
                <p>State:{props.state}</p>
                <p>Zipcode:{props.zipcode}</p>
                <p><b>Price:${props.price}</b></p>
                <p><a className="maps" href={`https://google.com/maps?q=${props.latitude},${props.longitude}`}>
                    See on google maps
                </a></p>
            </div>
        </div>
    )
}

export default property
