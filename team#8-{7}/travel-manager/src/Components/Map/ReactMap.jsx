import ReactMapboxGl from "react-mapbox-gl";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import markerUrl from "./icons8-marker-100.png";
import { useState } from "react";
const ReactMap = ({ state }) => {
  const { userLocation } = state;
  const [viewPort, setViewPort] = useState({
    longitude: userLocation.longitude,
    latitude: userLocation.latitude,
    height: "80vh",
    width: "100%",
    zoom: 14,
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
    <div className="map">
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
//import { useState } from "react";
// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
// import ReactMapGL from "react-map-gl";

// const ReactMap = ({ state: { userLocation } }) => {
//   const [viewPort, setViewPort] = useState({
//     longitude: userLocation.longitude,
//     latitude: userLocation.latitude,
//     height: "80vh",
//     width: "80vw",
//     zoom: 14,
//   });

//   const accessToken =
//     "pk.eyJ1Ijoicm9oaXRoOTU4OSIsImEiOiJja2c1NDg5eGswcTFnMndwanEybXFhZGdwIn0.qO1IIccfd4OXAPsX9ayBew";

//   return (
//     <ReactMapGL
//       {...viewPort}
//       maxZoom={20}
//       mapboxApiAccessToken={accessToken}
//       onViewportChange={(viewPort) => setViewPort({ ...viewPort })}
//     ></ReactMapGL>
//   );
// };

// export default ReactMap;
//
