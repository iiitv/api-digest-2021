import { useState } from "react";
import SearchBar from "./components/searchBar/SearchBar";
// import "./App.css";
function App() {
  const [state, setState] = useState("hello");

  return (
    <div className="App">
      <SearchBar />
      <p></p>
    </div>
  );
}

export default App;
