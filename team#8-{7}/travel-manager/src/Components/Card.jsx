import React from 'react'
function Card() {
    const res=`https://api.openweathermap.org/data/2.5/weather?q=Bhiwani&appid=55cd8303f8cb6319e0ce1c3761950f74`;
    return (
        <div className="card">
           <div className="left">
           </div>
           <div className="right">
               <h2>22 Deg</h2>
               <h3>Clouds</h3>
               <p>Sunday, july 21</p>
               
           </div>

        </div>
    )
}

export default Card;
