import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [percent,setPercent] = useState(0);
  const [percent24,setPercent24] = useState(0);
  useEffect( () => {
    const updateinterval = setInterval( () => {
      fetch("https://data.messari.io/api/v1/assets/bitcoin/metrics")
      .then(res => res.json())
      .then(
        res => setPercent(res.data.market_data.percent_change_usd_last_1_hour))
      },10000)
    return () => clearInterval(updateinterval);
  },[percent] )

  console.log(percent)
  
  return (
    <div className="App">
    </div>
  );
}

export default App;
