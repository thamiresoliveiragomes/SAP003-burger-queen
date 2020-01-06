import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Waiter from "./pages/Waiter";
import Kitchen from "./pages/Kitchen";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/waiter">Salão</Link>
            </li>
            <li>
              <Link to="/kitchen">Cozinha</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/waiter">
            <Waiter />
          </Route>
          <Route path="/kitchen">
            <Kitchen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
