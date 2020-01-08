import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';

function Home() {
  return (
    <nav>
      <figure className={css(styles.img)}>
        <img src={require('../img/queen1.png')} alt='logo' className={css(styles.logo)}/>
      </figure>
      <ul className={css(styles.ul)}>
        <li>
          <Link to="/waiter">Salão</Link>
        </li>
        <li>
          <Link to="/kitchen">Cozinha</Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = StyleSheet.create({
	ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
  logo: {
    width: '25%',
  },
  img: {
    display: 'flex',
		justifyContent: 'center'
  }
  
})


export default Home;
