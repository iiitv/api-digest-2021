import ReactMapboxGl from "react-mapbox-gl";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import markerUrl from "./icons8-marker-100.png";
import { useState } from "react";
const ReactMap = ({ state }) => {
  const { userLocation } = state;
  console.log(state);
  console.log(userLocation);
  const [viewPort, setViewPort] = useState({
    longitude: userLocation.longitude,
    latitude: userLocation.latitude,
    height: "80vh",
    width: "80%",
    zoom: 10,
    markerWidth: 2,
  });
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
    <div className="map container">
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken={accessToken}
        onViewportChange={(viewPort) =>
          setViewPort({ ...viewPort, markerWidth: state.markerWidth + 1 })
        }
        className="map"
      >
        <NavigationControl style={navControlStyle} />
        <Marker
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default ReactMap;
