import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [limit,setLimit] = useState();
  const [limit24,setLimit24] = useState();
  const [percent,setPercent] = useState({
    price:0,
    change: 0,
    change24: 0
  });
  useEffect( () => {
    const updateinterval = setInterval( () => {
      fetch("https://data.messari.io/api/v1/assets/bitcoin/metrics")
      .then(res => res.json())
      .then(
        res => setPercent({
          price: res.data.market_data.price_usd,
          change: res.data.market_data.percent_change_usd_last_1_hour,
          change24 : res.data.market_data.percent_change_usd_last_24_hours
        }) )},1000)
    return () => clearInterval(updateinterval);
  },[percent] )
  
  if(percent.change > limit){
    console.log("send message")
  }
  if(percent.change24 > limit24){
    console.log("send message")
  }
  
  return (
    <div className="App">
      <h1>Bitcoin</h1>
      <h3>Price: {percent.price}</h3>
      <h1>Hourly % Change: {percent.change}</h1>
      <h1>%Change in 24 Hours: {percent.change24}</h1>
      <h3> Set hourly limit</h3>
      <input value={limit} onChange={e => setLimit(e.target.value)}></input>
      <h3>Set Daily limit</h3>
      <input value={limit24} onChange={e => setLimit24(e.target.value)}></input>
    </div>
  );
}

export default App;
