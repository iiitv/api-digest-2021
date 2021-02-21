import React from "react";
import { Popup } from "react-leaflet";

const MarkerPopup = (props) => {
  const { data } = props;

  return (
    <Popup>
      <div className="poup-text">{data}</div>
    </Popup>
  );
};

export default MarkerPopup;
