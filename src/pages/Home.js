import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';

function Home() {
  return (
    <nav className={css(styles.nav)}>
		  <ul className={css(styles.ul, styles.flex)}>
        <li>
          <Link to="/waiter" className={css(styles.flex, styles.link)}>
              <img src={require('../img/waiter.png')} alt='Salão' className={css(styles.icon)}/>
              Salão
          </Link>
        </li>
        <li>
          <Link to="/kitchen" className={css(styles.flex, styles.link)}>
            <img src={require('../img/kitchen.png')} alt='Cozinha' className={css(styles.icon)}/>
            Cozinha
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const styles = StyleSheet.create({
	ul: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    '@media (max-width: 800px)': {
      flexDirection: 'column',
    }
	},
	icon: {
    width: '45%',
    backgroundColor: '#EFEAF1',
    borderRadius: '50%',
    border: '10px solid #F9BA2D',
    margin: '3% 0 5% 0',
    '@media (max-width: 800px)': {
      width: '25%',
    }
  },
  nav: {
    marginTop: '10%'
  },
  flex: {
    display: 'flex',
  },
  link: {
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '30px',
    color: '#F9BA2D',
    textDecoration: 'none',
    '@media (max-width: 800px)': {
      marginBottom: '10%',
    }
  }
})


export default Home;
