import { useEffect, useState } from "react";
import SearchBar from "./Components/searchBar/SearchBar";
import Card from "./Components/Weather/Card";
import "./App.css";
import NotFound from "./Components/NotFound/NotFound";
import WeatherChart from "./Components/WeatherChart/WeatherChart"
import AQI from "./Components/AQI/AQI";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ReactMap from "./Components/Map/ReactMap";
function App() {
  const [state, setState] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => setState({ userLocation: location.coords }),
      (err) => console.log(err),
      {
        enableHighAccuracy: true,
      }
    );
  }, []);
  return (
    <div className="App">
    <div class="row">
    <div id="sticky-navbar" className="col-md-2 bg-success">
    <div className="mynavbar  d-flex flex-column align-items-center font-weight-bolder">
<a href="#fid" className="mylink">Hospitals</a>
<a href="#fid" className="mylink">Schools</a>
<a href="#fid" className="mylink">Restaurants</a>
<a href="#weather" className="mylink">Weather</a>
<a href="#aqi" className="mylink">Air Quality</a>

    </div>
    </div>
    <div class="col-md-9">
      <SearchBar state={state} setState={setState} />
      {state.notFound && <NotFound />}
      <div className="card container">
      <div className="card-header text-center font-weight-bolder" id="weather">
        Check your Weather Details Here
      </div>
      {state.data&&  <Card state={state} setState={setState}/>}
      {/* {state.data && <Card state={state} setState={setState} />} */}
      <h2 className="text-center font-weight-bolder mt-4">Graph for Above Data is </h2>
      {state.forecast && <WeatherChart state={state} />}
      </div>
      <div id="aqi">
      {state.aqi_result&& <AQI state={state} setState={setState}/>}
      </div>
    </div>
    </div>
      {state.userLocation && <ReactMap state={state} />}
    </div>
  );
}

export default App;
