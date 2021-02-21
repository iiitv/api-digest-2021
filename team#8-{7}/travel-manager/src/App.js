import { useEffect, useState } from "react";
import SearchBar from "./Components/searchBar/SearchBar";
import Card from "./Components/Weather/Card";
import "./App.css";
import NotFound from "./Components/NotFound/NotFound";
import WeatherChart from "./Components/WeatherChart/WeatherChart";
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
      <SearchBar state={state} setState={setState} />
      {state.notFound && <NotFound />}
      {state.notFound && <Card state={state} setState={setState} />}
      {state.data && <Card state={state} setState={setState} />}
      {state.forecast && <WeatherChart state={state} />}
      {state.userLocation && (
        <ReactMap
          state={state}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      )}
    </div>
  );
}

export default App;
