import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Waiter from "./pages/Waiter";
import Kitchen from "./pages/Kitchen";
import { StyleSheet, css } from 'aphrodite';

function App() {
  return (
    <Router>
      <div>
          <figure className={css(styles.img)}>
            <img src={require('./img/logo.png')} alt='logo' className={css(styles.logo)}/>
          </figure>
        <Switch>
        <Route exact path="/">
        <nav>
		  <ul className={css(styles.ul)}>
            <li>
              <Link to="/waiter">Salao</Link>
            </li>
            <li>
              <Link to="/kitchen">Cozinha</Link>
            </li>
          </ul>
            <div>Home</div>
        </nav>
          </Route>
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

const styles = StyleSheet.create({
	ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
		justifyContent: 'space-around'
  },
  logo: {
    width: '20%',
  },
  img: {
    display: 'flex',
		justifyContent: 'center'
  }
})


export default App;
