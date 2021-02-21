import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [number,setNumber] = useState();
  const [llimit,setLlimit] = useState();
  const [ulimit,setUlimit] = useState();
  // const [limit24,setLimit24] = useState();
  const [percent,setPercent] = useState({
    price:0,
    change: 0
  });
  function showNotification() {
    const notification = new Notification("New meessage",{
      body: `Bitcoin just crossed limit set by you, for further details click`
    })
  }
  if(Notification.permission === "granted"){  }
  else if(Notification.permission !== "denied"){
    Notification.requestPermission().then(permission =>{
      if(permission === "granted"){
      showNotification();}
    })
  }
  const textmessage = "Hi bitcoin just crossed limit set by you - CryptoX";

  function sendtext(e){
    e.preventDefault();
    fetch(`http://localhoast:4000/send-text?recipient=${number}&textmessage=${textmessage}`)
    .catch(err => console.error(err))
  }

  var x = percent.change > ulimit;
  var y = percent.change < llimit;
  // if(x){
  //   var lim = "lower limit";
  // }

  // if(y){
  //   lim = "upper limit";
  // }
  useEffect(()=>{
    // const timer = setTimeout(()=>{
    //   console.log("hello")
    // },5000)
    showNotification()
  },[x,y])

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
  
  // if(percent.change > limit){
  //   showNotification();
  // }
  // if(percent.change24 > limit24){
  //   showNotification();
  // }

  return (
    <div className="App">
      <h1>Bitcoin</h1>
      <h3>Price: {percent.price}</h3>
      <h1>Hourly % Change: {percent.change}</h1>
      <h1>24 Hours % change: {percent.change24}</h1>
      <h3> Set hourly Lower limit %</h3>
      <input placeholder="percent" value={llimit} onChange={e => setLlimit(e.target.value)}></input>
      <h3>Set hourly Upper limit %</h3>
      <input placeholder="Percent" value={ulimit} onChange={e => setUlimit(e.target.value)}></input>
       <br></br>
       <br></br>
       <br></br>
       <input value={number} onChange={e => setNumber(e.target.value)} placeholder="Mobile No."></input>
        <button onClick={sendtext}>Register</button>
    </div>
  );
}

export default App;
