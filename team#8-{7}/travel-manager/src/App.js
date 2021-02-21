import { useState } from "react";
import SearchBar from "./Components/searchBar/SearchBar"
import Card from "./Components/Card";
import "./App.css";
function App() {
  const [state, setState] = useState("");

  return (
    <div className="App">
      <SearchBar state={state} setState={setState} />
      <Card />
    </div>
  );
}

export default App;
