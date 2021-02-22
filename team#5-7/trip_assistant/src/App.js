import logo from './logo.svg';
import './App.css';
import {Switch, Link, Redirect} from 'react-router-dom';
import SearchBar from './components/SearchBar';

function App(props) {

  return (
    <div className="App bg-dark" style={{minHeight: '100vh'}}>
      <div className="mx-auto bg-light w-100 py-4">
        <h1 className=" text-primary my-auto py-auto">Trip Assistant</h1>
      </div>
      <Switch>
        <Link to="/" component={SearchBar} {...props} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
