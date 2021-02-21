import { useState } from "react";
import SearchBar from "./Components/searchBar/SearchBar";
import Card from "./Components/Weather/Card"
import "./App.css";
import NotFound from "./Components/NotFound/NotFound";
import WeatherChart from "./Components/WeatherChart/WeatherChart"
import AQI from "./Components/AQI/AQI";
function App() {
  const [state, setState] = useState({notFound:true});
  console.log(state);
  return (
    <div className="App">
      <SearchBar state={state} setState={setState} />
      {state.notFound && <NotFound />}
      {!state.notFound&&  <Card state={state} setState={setState}/>}
      {/* {state.data && <Card state={state} setState={setState} />} */}
      {state.forecast && <WeatherChart state={state} />}
      {!state.notFound&& <AQI state={state} setState={setState}/>}
    </div>
  );
}

export default App;
