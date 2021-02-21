import React from "react";
import "./Card.css";
function CustomCard(props) {
  console.log("CustomCard", props);
  props = props.props;
  return (
    <div className="customcard text-center p-1 mb-1 card">
      <p>Day Temp:{props.temp.day}</p>
      <p>Night Temp:{props.temp.night}</p>
      {/* Putting an image tag here */}
      <p>description:{props.weather[0].description}</p>
    </div>
  );
}

export default CustomCard;
