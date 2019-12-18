import React, {useState, useEffect} from 'react';
import firebase from '../utils/firebase';
import OrderDone from '../components/order-done'

function Kitchen () {
  const [ order, setOrder ] = useState([]);

  useEffect(() => {
		firebase
			.firestore()
			.collection('order')
			.onSnapshot(snapshot => {
				const order = snapshot.docs.map(doc => ({
          id: doc.id,
					...doc.data()
				}))
				setOrder(order)
			})
  }, [])

  const renderOrder = () => {
		return order.filter(item => item.status === 'in preparation').map((item,index) =>
      <OrderDone key={index} id={item.id} client={item.client} table={item.table} 
      order={item.order.map(item => <div>{item.quantity} {item.name}</div>)} onClick={ ()=> orderDone(item)}/>
		)
  }
  
  const orderDone = (item) => {
    const id = item.id
    firebase
      .firestore()
      .collection('order')
      .doc(id)
      .update({
        status: 'done',
        dateEnd: new Date()
      })
    const index = order.indexOf(item)
    order.splice(index, 1)
    setOrder([...order])

  }

  return (
    <>
    <h1>
      Pedidos em Preparação
    </h1>
    <div>
    {renderOrder()}
    </div>
    </>
  )
}

export default Kitchen