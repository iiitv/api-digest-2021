import L from "leaflet";
// import ../images/marker.png from "";

export const MarkerIcon = L.icon({
  iconUrl: require("../images/marker.jpg").default,
  iconRetinaUrl: require("../images/marker.jpg").default,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});
