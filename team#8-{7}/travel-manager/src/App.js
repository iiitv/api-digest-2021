import { useState } from "react";
import SearchBar from "./Components/searchBar/SearchBar";
import Card from "./Components/Card";
import "./App.css";
import NotFound from "./components/NotFound/NotFound";
function App() {
  const [state, setState] = useState("");
  console.log(state);
  return (
    <div className="App">
      <SearchBar state={state} setState={setState} />
      {state.notFound && <NotFound />}
      <Card />
    </div>
  );
}

export default App;
