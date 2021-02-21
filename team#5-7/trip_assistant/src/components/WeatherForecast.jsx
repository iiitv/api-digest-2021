import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import FlightsDrawer from './FlightsDrawer';

const WeatherForecast = (props) => {

    const [visible, setVisible] = useState(false);
    const [date,setDate] = useState();

    // const searchFlights = async () => {
    //     try {
    //         const clientLocation = await axios.get("http://www.travelpayouts.com/whereami?locale=en");
    //         console.log(clientLocation.data);
    //     } catch (error) {
    //         console.log("Error-",error);
    //         message.error("No Flight Found");
    //     }
    // }

    const showDrawer = () => {
        setVisible(true);
    };
    
    const onClose = () => {
        setVisible(false);
    };

    const searchFlights = (date) => {
        setDate(date);
        showDrawer();
    }

    const renderWeatherCards = () => {
        return props.weather.map((data,key) => {
            let imageSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            return <div class="card my-4 mx-auto w-75" key={key}>
                <h5 class="card-header">{data.dt_txt.substring(0,10)}</h5>
                <div class="card-body d-flex justify-content-center">
                    {/* <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a> */}
                    <div>
                        <h5 class="card-title">Details</h5>
                        Minimum Temperature : <p>{data.main.temp_min} °C</p>
                        Maximum Temperature : <p>{data.main.temp_max} °C</p>
                        Humidity : <p>{data.main.humidity}</p>
                        Rain Possibility : <p>{data.clouds.all} %</p>
                        Weather : <p>{data.weather[0].description}</p>
                        <button class="btn btn-primary" onClick={() => searchFlights(data.dt_txt.substring(0,10))}>Search Flights</button>
                    </div>
                    <div>
                        <img src={imageSrc} />
                        <h4>{data.weather[0].main}</h4>
                    </div>
                </div>
            </div>
        })
    }


    console.log("Props=",props.weather);
    return ( 
        <div className="pb-2">
            <FlightsDrawer 
            visible={visible} 
            onClose={onClose}
            location={props.location}
            date={date} />
            {renderWeatherCards()}
        </div>
    );
}
 
export default WeatherForecast;