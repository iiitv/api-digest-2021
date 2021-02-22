import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FlightsDrawer from './FlightsDrawer';
import '../css/card.css';

const WeatherForecast = (props) => {

    const [visible, setVisible] = useState(false);
    const [date,setDate] = useState();

    useEffect(() => {

    }, [date])

    const showDrawer = () => {
        setVisible(true);
    };
    
    const onClose = () => {
        setDate();
        setVisible(false);
    };

    const searchFlights = async (date) => {
        await setDate(date);
        showDrawer();
    }

    const renderWeatherCards = () => {
        return props.weather.map((data,key) => {
            let imageSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            return (
                <div className="card my-5 mx-auto w-75" key={key}>
                    <h5 className="card-header">{data.dt_txt.substring(0,10)}</h5>
                    <div className="card-body d-flex justify-content-center">
                        <div>
                            <h5 className="card-title">Details</h5>
                            Minimum Temperature : <p>{data.main.temp_min} °C</p>
                            Maximum Temperature : <p>{data.main.temp_max} °C</p>
                            Humidity : <p>{data.main.humidity}</p>
                            Rain Possibility : <p>{data.clouds.all} %</p>
                            Weather : <p>{data.weather[0].description}</p>
                            <button className="btn btn-success btn-sm" onClick={() => searchFlights(data.dt_txt.substring(0,10))}>Search Flights</button>
                        </div>
                        <div>
                            <img src={imageSrc} />
                            <h4>{data.weather[0].main}</h4>
                        </div>
                    </div>
                </div>
            ); 
        });
    }

    console.log("Props=",props.weather);
    return ( 
        <div className="pb-2">
            {date && props.location &&
            <FlightsDrawer 
            visible={visible} 
            onClose={onClose}
            location={props.location}
            date={date} />
            }
            {renderWeatherCards()}
        </div>
    );
}
 
export default WeatherForecast;