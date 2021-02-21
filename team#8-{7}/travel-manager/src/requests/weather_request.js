import axios from "axios";
import { formatDate } from "./helper";
const API_KEY = "77a02429b97b271a7456b792ee9bcbaf";
const BASE_URL = "http://api.openweathermap.org/data/2.5/";
export const getWeatherData = async (value) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}weather?q=${value}&units=metric&appid=${API_KEY}`
    );
    const { coord } = data;
    console.log(formatDate(data.dt));
    const { lat, lon } = coord;
    const res = await axios.get(
      `${BASE_URL}onecall?lat=${lat}&lon=${lon}&units=metric&exclude={part}&appid=${API_KEY}`
    );

    console.log('Weather',data, res.data);
    return { data, forecast: res.data, status: 200 };
  } catch (error) {
    console.log(error);
    return { status: 404 };
  }
};
