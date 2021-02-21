import logo from './logo.svg';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {

  return (
    <div className="App">
      {process.env.REACT_APP_KEY}
      <SearchBar />
    </div>
  );
}

export default App;
