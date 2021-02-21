import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [limit,setLimit] = useState();
  const [percent,setPercent] = useState(0);
  const [percent24,setPercent24] = useState();
  useEffect( () => {
    const updateinterval = setInterval( () => {
      fetch("https://data.messari.io/api/v1/assets/bitcoin/metrics")
      .then(res => res.json())
      .then(
        res => setPercent(res.data.market_data.percent_change_usd_last_1_hour))
      },10000)
    return () => clearInterval(updateinterval);
  },[percent] )
  
  if(percent > limit){
    console.log("hurray")
  }
  
  return (
    <div className="App">
      <h1>Bitcoin</h1>
      <h1>{percent}</h1>
      <input value={limit} onChange={e => setLimit(e.target.value)}></input>
    </div>
  );
}

export default App;
