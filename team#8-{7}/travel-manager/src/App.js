import { useState } from "react";
import SearchBar from "./components/searchBar/SearchBar";
import "./App.css";
function App() {
  const [state, setState] = useState("");

  return (
    <div className="App">
      <SearchBar state={state} setState={setState} />
      <p></p>
    </div>
  );
}

export default App;
