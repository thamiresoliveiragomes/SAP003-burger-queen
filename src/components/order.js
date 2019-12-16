import React from 'react'
import Button from './button'

function Order (props) {
  return (
    <li key={props.id}>
      <div>
      {props.quantity}
      {props.name}
      {props.price}
      </div>
      <Button title={'Excluir'}/>
    </li>
  )
}

export default Order