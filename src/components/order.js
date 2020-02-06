import React from 'react'
import Button from './button'
import { StyleSheet, css } from 'aphrodite'

function Order (props) {
  return (
    <li className={css(styles.text)}>
      {props.quantity}x {props.name} {props.options ? <>({props.options})</> : false} 
      {props.extras ? props.extras.map(e=> <> +{e}</>) : false} R${props.price}
      <Button onClick={props.onClick} className={css(styles.btn)} 
      img={require('../img/delete.png')} classImg={css(styles.icon)}/>
    </li>
  )
};

const styles = StyleSheet.create({
  btn: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: '0',
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    width: '10%',
  },
  icon: {
    width: '30%',
  },
  text:{
    fontSize: '18px',
    margin: '2% 0 2% 0'
  }
})

export default Order