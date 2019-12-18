import React from  'react'

function OrderDone (props) {
    return (
    <li id={props.id}>
      <div>
        Cliente: {props.client} Mesa: {props.table}
      </div>
      <div>
        {props.order}
        Status: {props.status}
      </div>
  </li>
    )
}

export default OrderDone