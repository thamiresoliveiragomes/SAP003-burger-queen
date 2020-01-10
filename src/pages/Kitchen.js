import React, {useState, useEffect} from 'react';
import firebase from '../utils/firebase';
import OrderInPreparation from '../components/order-in-preparation';
import OrderDone from '../components/order-done';
import Navbar from '../components/navbar'
import { StyleSheet, css } from 'aphrodite';

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

  const renderInPreparationOrder = () => {
		return order.filter(item => item.status === 'Em preparação').map((item,index) =>
      <OrderInPreparation key={index} id={item.id} client={item.client} table={item.table} 
      status={item.status}
      order={item.order.map(item => <div>{item.quantity} {item.name}</div>)} 
      title={'Pedido pronto'}
      onClick={ ()=> orderDone(item)}/>
		)
  }
  
  const orderDone = (item) => {
    const id = item.id
    firebase
      .firestore()
      .collection('order')
      .doc(id)
      .update({
        status: 'Pronto',
        dateEnd: new Date()
      })
    const index = order.indexOf(item)
    order.splice(index, 1)
    setOrder([...order])
  }

  const renderDoneOrder = () => {
    return order.filter(item => item.status === 'Pronto').map((item,index) =>
    <OrderDone key={index} id={item.id} client={item.client} table={item.table} status={item.status}
    order={item.order.map(item => <div>{item.quantity} {item.name}</div>)} />
    )
  }

  return (
    <>
		<Navbar title={'Pedidos Pendentes'}/>
    <div>
      {renderInPreparationOrder()}
    </div>
    <h1>
      Pedidos para entrega
    </h1>
    <div>
      {renderDoneOrder()}
    </div>
    </>
  )
}

const styles = StyleSheet.create({
	ul: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  }
})

export default Kitchen