import React from 'react'
import Button from './button'

function OrderItens (props) {
  return (
    <li>
      <div>
        {props.quantity} {props.name} {props.options} {props.extras} R${props.price}
      </div>
      <Button onClick={props.onClick} title={'Excluir'}/>
    </li>
  )
}

export default OrderItens