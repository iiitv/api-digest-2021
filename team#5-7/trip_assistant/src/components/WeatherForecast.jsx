import React from 'react';

const WeatherForecast = (props) => {

    const renderWeatherCards = () => {
        return props.weather.map((data) => {
            let imageSrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            return <div class="card my-4 mx-auto w-75">
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
                        <a href="#" class="btn btn-primary">Search Flights</a>
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
            {renderWeatherCards()}
        </div>
    );
}
 
export default WeatherForecast;