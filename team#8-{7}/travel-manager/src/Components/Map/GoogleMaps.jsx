import React from "react";
import {withGoogleMap,GoogleMap, Marker} from "react-google-maps";

function GoogleMaps() {
    const GoogleMapExample=withGoogleMap((props)=>{
        <GoogleMap
        defaultCenter={{lat:38 , lng: -77}}
        defaultZoom={13}        
        >

        </GoogleMap> 
       });
    return (
        <div>
           <GoogleMapExample
           isMarkerShown
           containerElement={<div style={{height:'500px' , width:'500px'}}></div>}
           mapElement={<div style={{height:'100%'}}></div>}
           ></GoogleMapExample> 
        </div>
    
}

export default GoogleMaps
