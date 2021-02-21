import React, { useRef } from "react";
import { getWeatherData } from "../../requests/weather_request";
const SearchBar = ({ state, setState }) => {
  const ref = useRef();
  const handleWeatherFetch = async () => {
    const value = ref.current.value;
    if (value.length > 0) {
      const res = await getWeatherData(value);
      if (res.status === 200)
        setState({
          ...state,
          data: res.data,
          forecast: res.forecast,
          notFound: false,
        });
      else setState({ notFound: true });
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
