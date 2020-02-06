import React from 'react'
import Button from './button'
import { StyleSheet, css } from 'aphrodite'

function Card (props) {
  return (
    <li id={props.id} className={css(style.order)}>
      <p className={css(style.itens)}>Cliente: {props.client}</p>
      <p className={css(style.itens)}>Mesa: {props.table}</p>
      <p className={css(style.itens)}>{props.order}</p>
      <p className={css(style.itens)}>Total: R${props.total}</p>
      <p className={css(style.itens)}>{props.time}</p>
      <Button onClick={props.onClick} title={props.title} className={css(style.btn)}/>
    </li>
  )
};

const style = StyleSheet.create({
  order: {
    width: '27%',
    padding: '2%',
    margin: '1%',
    backgroundColor: '#513184',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: '10%',
    '@media (max-width: 800px)': {
      width: '42%'
    }
  },
  itens: {
    margin: '0 0 1% 0'
  },
  btn: {
    backgroundColor: '#F9BA2D',
    border: 'none',
    textAlign: 'center',
    textDecoration: 'none',
    color: '#513184',
    width: '70%',
    padding: '3%',
    fontFamily: 'baloo',
    fontSize: '18px'
  }
})

export default Card