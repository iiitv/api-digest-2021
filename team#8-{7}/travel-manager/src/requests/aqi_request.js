import axios from "axios";

const API_KEY = "77a02429b97b271a7456b792ee9bcbaf";
const BASE_URL = "http://api.openweathermap.org/data/2.5/";
const aqi_key='a1b981a276f0414585248191ad674656';
const aqi_url='https://api.weatherbit.io/v2.0/current/airquality'
export const apiRequest=async(value)=>{
try {
    const { data } = await axios.get(
        `${BASE_URL}weather?q=${value}&units=metric&appid=${API_KEY}`
      );
      const { coord } = data; //log lat
      const {lat, lon}=coord;
      const aqi_result=await axios.get(`${aqi_url}?lat=${lat}&lon=${lon}&key=${aqi_key}`);
      console.log("Aqi",aqi_result);
      return {aqi_result,status:200};
} catch (error) {
    console.log(error);
    return {status:400};
}
}