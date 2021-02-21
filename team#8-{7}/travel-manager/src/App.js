import { useState } from "react";
import SearchBar from "./components/searchBar/SearchBar";
import "./App.css";
import NotFound from "./components/NotFound/NotFound";
function App() {
  const [state, setState] = useState("");
  console.log(state);
  return (
    <div className="App">
      <SearchBar state={state} setState={setState} />
      {state.notFound && <NotFound />}
    </div>
  );
}

export default App;
