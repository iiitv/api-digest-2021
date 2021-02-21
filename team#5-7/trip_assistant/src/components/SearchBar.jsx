import React, { useEffect } from 'react';
import {Input, message} from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';
import WeatherForecast from './WeatherForecast';


const SearchBar = () => {

    const {Search} = Input;

    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState();

    useEffect(async () => {

    }, [location])

    const onSearch = async (e) => {
        setLocation(e);
        console.log("Searched---",e);
        try {
            const res = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${e}&units=metric&APPID=${process.env.REACT_APP_WEATHER_API}`);
            let weather=[];
            for (let index = 0; index < res.data.list.length; index += 8) {
                weather.push(res.data.list[index]);
            }
            console.log(weather);
            setWeather(weather);
            message.success("Data fetched successfully");
        } catch (error) {
            console.log(error);
            setWeather([]);
            message.error("Place not found");
        }
    }

    return ( 
        <div className="container mx-auto py-5 w-50">
            <Search placeholder="Enter city name" onSearch={onSearch} enterButton />
            { weather && <WeatherForecast weather={weather} location={location} /> }
        </div>
    );
}
 
export default SearchBar;