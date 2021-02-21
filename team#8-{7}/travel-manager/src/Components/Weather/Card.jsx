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
        <div className="card container">
        <div className="row text-align-center d-flex justify-content-center align-items-center">
        <h1 className="display-4 font-weight-bolder">{data.name}</h1>
        <h2 className="font-weight-bold ml-3">{data.sys.country}</h2>
        </div>
        <div className="row d-flex justify-content-center align-items-center offset-md-2">
        <div className="col-sm-6 text-center  ">
        <img src={imgsrc} alt="weather" className="img-fluid img-responsive customimage"></img>
        <h2 className="display-4">{data.main.temp}</h2>
        <p className="text-capitalize">{data.weather[0].description}</p>
        </div>
        <div className="col-sm-6 ">
        <div className="row">

<div className="col-sm-4">{data.main.temp_max}</div>
<div className="col-sm-4">{data.main.temp_min}</div>
<div className="col-sm-4">{data.wind.speed}</div>
        </div>
        <div className="row">
<div className="col-sm-4">{data.sys.sunrise}</div>
         <div className="col-sm-4">{data.sys.suneast}</div>  
         <div className="col-sm-4">{data.main.humidity}</div>   
        </div>
        </div>
        </div>
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
