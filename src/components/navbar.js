import React from 'react';
import { Link } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';

function Navbar (props) {
  return (
    <nav>
      <ul className={css(styles.ul)}>
        <li>
          <Link to="/">
            <img src={require('../img/back.png')} alt='voltar' className={css(styles.icon)}/>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = StyleSheet.create({
  ul: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
  },
  icon: {
    width: '5%',
    marginLeft: '4%'
  },
})

export default Navbar;