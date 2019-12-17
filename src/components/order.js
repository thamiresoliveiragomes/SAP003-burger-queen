import React from 'react'
import Button from './button'

function Order (props) {
  return (
    <li>
      <div>
      {props.quantity} {props.name} R${props.price}
      </div>
      <Button onClick={props.onClick} title={'Excluir'}/>
    </li>
  )
}

export default Order