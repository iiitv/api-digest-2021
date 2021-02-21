import React from 'react';

const WeatherForecast = (props) => {

    console.log("Props=",props.weather);
    return ( 
        props.weather.map((data,key) => {
            let imageSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            return <div class="card my-4 mx-auto w-50">
                <h5 class="card-header">{data.dt_txt.substring(0,10)}</h5>
                <div class="card-body d-flex justify-content-center">
                    {/* <h5 class="card-title">Special title treatment</h5>
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a> */}
                    <div>
                        <h5 class="card-title">Details</h5>
                        Minimum Temperature : <p>{data.main.temp_min} C</p>
                        Maximum Temperature : <p>{data.main.temp_max} C</p>
                        Humidity : <p>{data.main.humidity}</p>
                        Rain Possibility : <p>{data.clouds.all} %</p>
                        Weather : <p>{data.weather[0].description}</p>
                        <a href="#" class="btn btn-primary">Search Flights</a>
                    </div>
                    <div>
                        <img src={imageSrc} />
                    </div>
                </div>
            </div>
        })
    );
}
 
export default WeatherForecast;