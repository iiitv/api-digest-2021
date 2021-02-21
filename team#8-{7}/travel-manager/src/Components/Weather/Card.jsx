import React from 'react'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Card.css";
import CustomCard from './CustomCard';
function Card(props) {
    console.log('Inside',props);
    const state=props.state;
    const data=state.data;
    const forecast=state.forecast;
    // const imgsrc=`${data.weather[0].icon}.png`
    // const iconName=data.weather[0].icon;
    // const iconApi = `http://openweathermap.org/img/w/${iconName}.png`;
    const imgsrc='images/bg.jpg';
    const arr=state.forecast.daily;
    // console.log(iconApi);
    return (
        <div className="container">
        <div className="row text-align-center d-flex justify-content-center align-items-center">
        <h1 className="display-4 font-weight-bolder">{data.name}</h1>
        <h2 className="font-weight-bold ml-3">{data.sys.country}</h2>
        </div>
        <div className="row d-flex justify-content-center align-items-center">
        <div className="col-sm-6 text-center mt-4">
        <img src={imgsrc} alt="weather" className="img-fluid img-responsive customimage"></img>
        <h2 className="display-4">{data.main.temp}°C</h2>
        <p className="text-capitalize font-weight-bolder">{data.weather[0].description}</p>
        </div>
        <div className="col-sm-6 text-center bg-info rounded-lg text-white font-weight-bolder infos" >
        <div className="row">

<div className="col-sm-4">
    <p className="m-0 mt-4">Max Temp. is</p>
    <p className="m-0">{data.main.temp_max}°C</p>
    </div>
<div className="col-sm-4">
<p className="m-0 mt-4">Min Temp. is</p>
<p className="m-0">{data.main.temp_min}°C</p>
</div>
<div className="col-sm-4">
<p className="m-0 mt-4">Wind Speed is</p>
    <p className="m-0">{data.wind.speed}</p>

</div>
        </div>
        <div className="row">
<div className="col-sm-4">
<p className="m-0 mt-4">Sun rises at</p>
    <p className="m-0 mb-4"> 
{data.sys.sunrise}</p> 

</div>
         <div className="col-sm-4">
         <p className="m-0 mt-4">SunSet at</p>
         <p className="m-0 mb-4">{data.sys.sunset}</p>
         </div>  
         <div className="col-sm-4">
         <p className="m-0 mt-4"> Humidity is </p>
         <p className="m-0 mb-4"> {data.main.humidity}</p>
        </div>   
        </div>
        </div>
        </div>
        <h2 className="text-center font-weight-bolder mt-4">Weather for next 8 days is</h2>
        <div className="row">
        {arr.map((ele)=>{
            return(
            <div className="col-sm-3">
            <CustomCard props={ele} />
            </div> 
            )
        })}
        </div>
</div>
    )
}

export default Card;
