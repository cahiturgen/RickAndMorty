import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from './pages/Dashboard/Dashboard';
import CharacterDetails from './pages/CharacterDetails/CharacterDetails';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <Route path="/" exact component={Dashboard}></Route>
            <Route path="/character-details/:id" component={CharacterDetails}></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
