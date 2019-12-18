import React from 'react'
import Button from './button'

function OrderInPreparation (props) {
  return (
    <li id={props.id}>
      <div>
        Cliente: {props.client} Mesa: {props.table}
      </div>
      <div>
        {props.order}
        Status: {props.status}
      </div>
      <div>
        <Button onClick={props.onClick} title={props.title}/>
      </div>
    </li>
  )
}

export default OrderInPreparation