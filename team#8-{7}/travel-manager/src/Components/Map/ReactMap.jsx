import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Markers from "./Marker";

const ReactMap = ({ state }) => {
  const currentLocation = {
    lat: state.userLocation.latitude,
    lng: state.userLocation.longitude,
  };
  return (
    <div className="container">
    <div className="card-header text-center font-weight-bolder">
      See Your Hospitals,Schools and Restaurants Here
    </div>
    <div className="map">
      <MapContainer center={currentLocation} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Markers type={"hospital"} />
        <Markers type={"school"} />
        <Markers type={"resturents"} />
      </MapContainer>
    </div>
    </div>
  );
};

export default ReactMap;