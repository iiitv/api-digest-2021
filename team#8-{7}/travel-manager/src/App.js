import { useState } from "react";
import SearchBar from "./Components/searchBar/SearchBar";
import Card from "./Components/Weather/Card"
import "./App.css";
import NotFound from "./Components/NotFound/NotFound";
import WeatherChart from "./Components/WeatherChart/WeatherChart"
import AQI from "./Components/AQI/AQI";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [state, setState] = useState({notFound:true});
  console.log(state);
  return (
    <div className="App">
    <div class="row">
    <div id="sticky-navbar" class="col-md-2">
    <h1 className="text-white">Hey</h1>
    </div>
    <div class="col-md-8">
      <SearchBar state={state} setState={setState} />
      {state.notFound && <NotFound />}
      <div className="card container">
      <div className="card-header text-center font-weight-bolder">
        Check your Weather Details Here
      </div>
      {!state.notFound&&  <Card state={state} setState={setState}/>}
      {/* {state.data && <Card state={state} setState={setState} />} */}
      <h2 className="text-center font-weight-bolder mt-4">Graph for Above Data is </h2>
      {state.forecast && <WeatherChart state={state} />}
      </div>
      {!state.notFound&& <AQI state={state} setState={setState}/>}
    </div>
    </div>
    </div>
  );
}

export default App;
