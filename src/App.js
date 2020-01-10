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
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div>
          <figure className={css(styles.img)}>
            <img src={require('./img/logo.png')} alt='logo' className={css(styles.logo)}/>
          </figure>
        <Switch>
          <Route exact path="/">
            <Home/>
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
    width: '17%',
  },
  img: {
    display: 'flex',
		justifyContent: 'center'
  }
})


export default App;
