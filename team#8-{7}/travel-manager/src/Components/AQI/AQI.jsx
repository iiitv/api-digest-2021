import React from 'react'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
function AQI({state,setState}) {
    let data=state.aqi_result;
    let temp=data.aqi_result;
    console.log("AQI Level is ",temp);
    data=data.aqi_result.data.data[0];
    return (
        <div>
           <div className="card container text-center mt-4">
           <div className="card-header font-weight-bolder">
               Check Your Quality of Air Here
           </div>
               <div className="row">
        <div className="col-sm-4">
            <h2 className="">Aqi Level:</h2>
            <p>{data.aqi}</p>
        </div>
<div className="col-sm-4">
<h2 className="">PM10 Level:</h2>
            <p>{data.pm10}</p>
</div>
<div className="col-sm-4">
<h2 className="">No2 Level:</h2>
            <p>{data.no2}</p>
</div>
               </div>
               <div className="row">
                   <div className="col-sm-4">
                   <h2 className="">Ozone Level:</h2>
            <p>{data.o3}</p>
                   </div>
<div className="col-sm-4">
<h2 className="">Sulphur Dioxide level:</h2>
            <p>{data.so2}</p>
</div>
<div className="col-sm-4">
<h2 className="">PM25 Level:</h2>
            <p>{data.pm25}</p>
</div>
                   </div>
           </div>
        </div>
    )
}

export default AQI
