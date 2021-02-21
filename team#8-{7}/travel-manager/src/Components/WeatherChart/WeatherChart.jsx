import React from "react";
import { Line } from "react-chartjs-2";
import { formatDate } from "../../requests/helper";
const WeatherChart = ({ state }) => {
  const data = {
    labels: state.forecast?.daily.map((day) => formatDate(day.dt)),
    datasets: [
      { 
        label: "Max  temp in °C",
        data: state.forecast?.daily.map((day) => day.temp?.max),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
      },
      {
        label: "Min  temp °C",
        data: state.forecast?.daily.map((day) => day.temp?.min),
        backgroundColor: ["rgba(6, 230, 62, 0.2)"],
        borderColor: ["#7ec720"],
      },
    ],
  };
  console.log(data);
  return (
    <div className="chart">
      <Line data={data} />;
    </div>
  );
};

export default WeatherChart;
