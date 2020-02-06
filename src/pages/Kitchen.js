import React, {useState, useEffect} from 'react';
import firebase from '../utils/firebase';
import Card from '../components/card';
import Navbar from '../components/navbar'
import { StyleSheet, css } from 'aphrodite';

function Kitchen () {
  const [ order, setOrder ] = useState([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection('order')
      .orderBy('dateStart', 'asc')
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
    <Card key={index} id={item.id} client={item.client} table={item.table} 
    order={item.order.map(item => <p>{item.quantity}x {item.name} 
    {item.options ? <div> ({item.options})</div> : false}
    {item.extras ? item.extras.map(e=> <> +{e}</>) : false}</p>)}
    total={item.total}
    title={'PEDIDO PRONTO'}
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
        dateEnd: new Date().getTime()
      })
    const index = order.indexOf(item)
    order.splice(index, 1)
    setOrder([...order])
}

return (
    <>
    <Navbar/>
    <section>
      <h1 className={css(styles.title)}>Pedidos em preparação</h1>
      <div className={css(styles.order)}>
        {renderInPreparationOrder()}
      </div>
    </section>
    </>
  )
}

const styles = StyleSheet.create({
  order: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'baseline'
  },
  title: {
    textAlign: 'center',
    fontFamily: 'baloo',
    marginTop: '0',
    color: '#F9BA2D',
  }
})

export default Kitchen
