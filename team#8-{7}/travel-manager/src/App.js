import { useState } from "react";
import SearchBar from "./Components/searchBar/SearchBar";
import "./App.css";
import Card from "./Components/Card";

import NotFound from "./Components/NotFound/NotFound";
import WeatherChart from "./Components/WeatherChart/WeatherChart";
function App() {
  const [state, setState] = useState("");
  console.log(state);
  return (
    <div className="App">
      <SearchBar state={state} setState={setState} />
      {state.notFound && <NotFound />}
      {/* {state.data && <Card state={state} setState={setState} />} */}
      {state.forecast && <WeatherChart state={state} />}
    </div>
  );
}

export default App;
