import React from 'react';



const property = (props) => {
    return (
        <div className="property">
            Property
            <p>{props.bathrooms}</p>
            <p>{props.bedrooms}</p>
            <p>{props.price}</p>
            <p>{props.address}</p>
            <p>{props.footage}</p>
            <p>{props.county}</p>
            <p>{props.type}</p>
            <p>{props.city}</p>
            <p>{props.state}</p>
            <p>{props.zipcode}</p>
        </div>
    )
}

export default property
