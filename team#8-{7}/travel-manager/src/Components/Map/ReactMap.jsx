import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const ReactMap = ({ state }) => {
  const props = {
    center: {
      lat: state.userLocation.latitude,
      lng: state.userLocation.longitude,
    },
    zoom: 11,
  };
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
    console.log(map);
    console.log(maps);
  };

  return (
    <div className="map">
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDsEA4Q4yYfziet_deC4PSvP4uiB5bCK94" }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default ReactMap;
