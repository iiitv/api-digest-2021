import logo from './logo.svg';
import './App.css';
import {Switch, Link, Redirect} from 'react-router-dom';
import SearchBar from './components/SearchBar';

function App(props) {

  return (
    <div className="App">
      {process.env.REACT_APP_KEY}
      <Switch>
        <Link to="/flights" component={SearchBar} {...props} />
        <Link to="/" component={SearchBar} {...props} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
