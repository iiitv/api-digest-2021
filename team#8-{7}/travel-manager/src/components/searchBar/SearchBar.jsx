import React, { useRef } from "react";
import { apiRequest } from "../../requests/aqi_request";
import { getWeatherData } from "../../requests/weather_request";
const SearchBar = ({ state, setState }) => {
  const ref = useRef();
  const handleWeatherFetch = async () => {
    const value = ref.current.value;
    if (value.length > 0) {
      const res = await getWeatherData(value);
      const res2=await apiRequest(value);
      console.log('SearchBar',res)
      const finalStatus=res.status===200&&res2.status===200
      if (finalStatus)
        setState({
          ...state,
          data: res.data,
          forecast: res.forecast,
          aqi_result:res2,
          notFound: false,
        });
      else setState({ notFound: true });
    }
  };
  return (
    <div className="search-bar-container">
      <input type="text" ref={ref} />
      <button onClick={handleWeatherFetch}>Search</button>
    </div>
  );
};

export default SearchBar;
