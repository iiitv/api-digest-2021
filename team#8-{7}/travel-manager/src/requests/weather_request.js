import axios from "axios";
const API_KEY = "77a02429b97b271a7456b792ee9bcbaf";
const BASE_URL = "http://api.openweathermap.org/data/2.5/";
export const getWeatherData = async (value) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}weather?q=${value}&appid=${API_KEY}`
    );
    const { coord } = data;
    const { lat, lon } = coord;
    const res = await axios.get(
      `${BASE_URL}onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_KEY}`
    );
    console.log(data, res.data);
  } catch (error) {
    console.log(error);
  }
};
