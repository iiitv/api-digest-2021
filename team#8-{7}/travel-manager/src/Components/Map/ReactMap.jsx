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

  const accessToken =
    "pk.eyJ1Ijoicm9oaXRoOTU4OSIsImEiOiJja2c1NDg5eGswcTFnMndwanEybXFhZGdwIn0.qO1IIccfd4OXAPsX9ayBew";

  const navControlStyle = {
    right: 10,
    top: 10,
  };

  const markerStyles = {
    width: viewPort.zoom * 3,
  };

  //   console.log(viewPort);
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
          <img style={markerStyles} src={markerUrl} alt="" />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default ReactMap;
