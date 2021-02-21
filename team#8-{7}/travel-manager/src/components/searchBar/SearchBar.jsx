import React, { useRef } from "react";
import axios from "axios";

const SearchBar = () => {
  const ref = useRef();
  const API_KEY = "77a02429b97b271a7456b792ee9bcbaf";
  const handleWeatherFetch = async () => {
    try {
      const value = ref.current.value;
    
  };
  return (
    <div>
      <input type="text" ref={ref} />
      <button onClick={handleWeatherFetch}>clck me</button>
    </div>
  );
};

export default SearchBar;
