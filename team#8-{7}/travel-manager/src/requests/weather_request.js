import axios from "axios";
const API_KEY = "77a02429b97b271a7456b792ee9bcbaf";
const BASE_URL = "http://api.openweathermap.org/data/2.5/";
const handleWeatherFetch = async (value) => {
  try {
    const res = await axios
      .get(`${BASE_URL}weather?q=${value}&appid=${API_KEY}`)
      .then((res) => {
        axios
          .get(
            `${BASE_URL}onecall?lat=72.4&lon=46.5&exclude={part}&appid=${API_KEY}`
          )
          .then((res) => console.log(res))
          .catch((er) => console.log(er));
      });

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
