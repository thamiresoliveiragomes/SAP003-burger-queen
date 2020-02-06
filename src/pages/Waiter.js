import React, {useState, useEffect} from 'react';
import firebase from '../utils/firebase';
import Input from '../components/input';
import Button from '../components/button';
import Menu from '../components/menu';
import Order from '../components/order';
import Card from '../components/card';
import Navbar from '../components/navbar'
import { StyleSheet, css } from 'aphrodite';

function Waiter () {
  const [ menu, setMenu ] = useState([]);
  const [ isBreakfast, setIsBreakfast ] = useState('breakfast');
  useEffect(() => {
    firebase
      .firestore()
      .collection('menu')
      .orderBy("name", "asc")
      .onSnapshot(snapshot => {
        const menu = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setMenu(menu)
      })
  }, [])

  const renderMenu = () => {
    if (isBreakfast === 'breakfast') {
      return menu.filter(item => item.type === 'breakfast').map((menu, index) =>
        <Menu key={index} id={menu.id} name={menu.name} price={menu.price} 
        onClick={() => addItem(menu)} className={css(styles.btn, styles.center)} 
        img={menu.img} classImg={css(styles.iconItem)}/>
      )
    } else {
      return menu.filter(item => item.type === 'all day').map((menu,index) => 
        <Menu key={index} menu={menu} extras={menu.extras} options={menu.options}
        id={menu.id} name={menu.name} price={menu.price} onClick={addItem}
        className={css(styles.btn, styles.center)}
        img={menu.img} classImg={css(styles.iconItem)}/>
      )
    }
  }

  const handleClick = (type) => {
    setIsBreakfast(type)
  }

  const [ order, setOrder ] = useState([]);
  const [ total, setTotal ] = useState(0)

  const addItem = (item) => {
    if(item.extras){
      item.price = item.price + item.extras.length
    }
    if(!order.includes(item)){
      item.quantity = 1
      setOrder([...order, item ])
    } else {
      item.quantity += 1
      setOrder([...order])
    }
    setTotal(total + item.price)
  }

  const deleteItem = (item) => {
    const updateTotal = total - item.price
    if (item.quantity === 1){
      const index = order.indexOf(item)
      order.splice(index, 1)
      setOrder([...order])
      setTotal(updateTotal)
    } else {
      item.quantity -= 1
      setTotal(updateTotal);
    }
  }

  const [client, setClient] = useState('');
  const [table, setTable] = useState('')

  function sendOrder(e) {
    e.preventDefault()
    firebase
      .firestore()
      .collection('order')
      .add({
        dateStart: new Date().getTime(),
        client,
        table: Number(table),
        order,
        total,
        status: 'Em preparação'
      })
      .then(
        setClient(''),
        setTable(''),
        setOrder([]),
        setTotal(0)
      )
  }

  const [ orderDone, setOrderDone ] = useState([]);
    useEffect(() => {
      firebase
        .firestore()
        .collection('order')
        .orderBy('dateEnd', 'asc')
        .onSnapshot(snapshot => {
          const orderDone = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
      setOrderDone(orderDone)
    })
  }, []);
  
  const timestampToDate = (timestamp) => {
    const hours = Math.floor(timestamp/60/60);
    const minutes = Math.floor((timestamp - hours *60 *60)/60);
    const seconds = Math.floor(timestamp -hours *60 *60 - minutes *60);
    return (
      <p>Tempo de Preparo: {hours}:{minutes}:{seconds}</p>
    )
  }

  const renderDoneOrder = () => {
    return orderDone.filter(item => item.status === 'Pronto').map((item,index) =>
      <Card key={index} id={item.id} client={item.client} table={item.table} 
      order={item.order.map(item => <p>{item.quantity}x {item.name} 
      {item.options ? <div> ({item.options})</div> : false}
      {item.extras ? item.extras.map(e=> <> +{e}</>) : false}</p>)}
      time={timestampToDate((item.dateEnd - item.dateStart)/1000)}
      total={item.total}
      title={'PEDIDO ENTREGUE'}
      onClick={()=> orderFinished(item)}/>
    )
  }

  const orderFinished = (item) => {
    const id = item.id
      firebase
        .firestore()
        .collection('order')
        .doc(id)
        .update({
          status: 'Concluido',
        })
    const index = order.indexOf(item)
    orderDone.splice(index, 1)
    setOrderDone([...orderDone])
  }

  return (
    <>
      <Navbar title={'Realizar pedido'}/>
      <section className={css(styles.menu)}>
        <div className={css(styles.center)}>
          <Button onClick={() => handleClick('breakfast')} title={'Café da manhã'} 
          className={css(styles.btn, styles.center)} 
          img={require('../img/coffee.png')} classImg={css(styles.icon)}/>
          <Button onClick={() => handleClick('all day')} title={'Almoço e jantar'} 
          className={css(styles.btn, styles.center)} 
          img={require('../img/lunch.png')} classImg={css(styles.icon)}/>
        </div>
        <div>
          <ul className={css(styles.ul, styles.center)}>
            {renderMenu()}
          </ul>
        </div>
      </section>
      <section>
        <form className={css(styles.form)}>
          <Input label={'Nome:'} type={'text'} value={client}
          onChange={e => setClient(e.currentTarget.value)}
          className={css(styles.inputName)}/>
          <Input label={'Mesa:'} type={'number'} value={table}
          onChange={e => setTable(e.currentTarget.value)}
          className={css(styles.inputTable)}/>
        </form>
        <div className={css(styles.itens)}>
          {order.map((item, index) => 
            <Order key={index} quantity={item.quantity} name={item.name} 
            options={item.options} extras={item.extras} price={item.price}
            onClick={() => deleteItem(item) }/>
          )}
          <p>Total: R${total}</p>
          <Button onClick={sendOrder} title={'Enviar pedido'}/>
        </div>
      </section>
      <section>
        <h1 className={css(styles.title)}>Pedidos para Entrega</h1>
        <div className={css(styles.order)}>
          {renderDoneOrder()}
        </div>
      </section>
    </>
  );
};

const styles = StyleSheet.create({
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  ul: {
    listStyleType: 'none',
    margin: '0',
    padding: '0',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  btn: {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: '0',
    font: 'inherit',
    cursor: 'pointer',
    outline: 'inherit',
    width: '50%',
    margin: '2% 0 2% 0',
    flexDirection: 'column',
    alignItems: 'center'
  },
  icon: {
    width: '12%',
  },
  iconItem: {
    width: '50%',
    margin: '10%'
  },
  form: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  inputName: {
    width: '100%'
  },
  inputTable: {
    width: '40%',
    height: '30%'
  },
  itens: {
    marginLeft: '13%'
  },
  order: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'baseline'
  },
  title: {
    textAlign: 'center',
    fontFamily: 'baloo',
    color: '#F9BA2D'
  }
})

export default Waiter
