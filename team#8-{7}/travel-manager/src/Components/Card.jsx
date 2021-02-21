import React from 'react'
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
function Card(props) {
    console.log('Inside',props);
    const imgsrc=`images/bg.jpg`;
    return (
        <div className="card container">
        <div className="row">
           <div className="left col-sm-6">
           <img src={imgsrc} alt="Weather" className="img-fluid"></img>
           </div>
           <div className="right col-sm-6 d-flex align-items-center justify-content-center">
           <div className="detail">
               <h2>22 Deg</h2>
               <h3>Cloudy</h3>
               <p>Sunday 20 feb,2021</p>
               </div>
           </div>
</div>
        </div>
    )
}

export default Card;
