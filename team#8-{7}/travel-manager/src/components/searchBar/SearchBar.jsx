import React, { useRef } from "react";
import { getWeatherData } from "../../requests/weather_request";
const SearchBar = ({ state, setState }) => {
  const ref = useRef();
  const API_KEY = "77a02429b97b271a7456b792ee9bcbaf";

  const handleWeatherFetch = async () => {
    const value = ref.current.value;
    if (value.length > 0) {
      const res = await getWeatherData(value);
      console.log('SearchBar',res)
    }
  };

  return (
    <div className="search-bar-container">
      <input type="text" ref={ref} />
      <button onClick={handleWeatherFetch}>Click me</button>
    </div>
  );
};

export default SearchBar;
