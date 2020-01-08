import React from 'react'
import Button from './button'

function OrderItens (props) {
  return (
    <li>
      <div>
        {props.quantity} {props.name} {props.options ? <>({props.options})</> : false} 
        {props.extras ? props.extras.map(e=> <div>+{e}</div>) : false} R${props.price}
      </div>
      <Button onClick={props.onClick} title={'Excluir'}/>
    </li>
  )
}

export default OrderItens