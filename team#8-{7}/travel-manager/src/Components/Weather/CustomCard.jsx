import React from "react";
import { formatDate } from "../../requests/helper";
import "./Card.css";
function CustomCard(props) {
  console.log("CustomCard", props);
  props = props.props;
  const iconName = props.weather[0].icon;
  const iconApi = `http://openweathermap.org/img/w/${iconName}.png`;

  console.log(props);
  const imgsrc = "images/bg.jpg";
  return (
    <div className="customcard text-center p-1 mb-1 card">
      <div className="card-header">{formatDate(props.dt)}</div>
      <div className="card-body cardbody">
        {/* Putting an image tag here */}
        <img
          src={iconApi}
          alt="Status of weather"
          className="cardimage rounded-circle"
        ></img>
        <p className="m-1">Day Temp:{props.temp.day}°C</p>
        <p className="m-1">Night Temp:{props.temp.night}°C</p>
        <p className="m-1">Description:{props.weather[0].description}</p>
      </div>
    </div>
  );
}

export default CustomCard;
