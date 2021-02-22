import React, { Fragment } from "react";
import { Marker } from "react-leaflet";
import MarkerPopup from "./MarkerPopup";
import { MarkerIcon } from "./MarkerIcon";
import data from "../rawdata.json";

const Markers = ({ type }) => {
  const item = data[type];
  console.log(type);
  const markers = item.map((item, index) => (
    <Marker key={index} position={item.geometry} icon={MarkerIcon}>
      <MarkerPopup data={type} />
    </Marker>
  ));

  return <>{markers}</>;
};

export default Markers;
