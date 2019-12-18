import React from 'react'
import Button from './button'

function OrderDone (props) {
  return (
    <li id={props.id}>
      <div>
        Cliente: {props.client} Mesa: {props.table}
      </div>
      <div>
        {props.order}
      </div>
      <div>
        <Button onClick={props.onClick} title={'Pedido pronto'}/>
      </div>
    </li>
  )
}

export default OrderDone