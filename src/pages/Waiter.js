import React, {useState, useEffect} from 'react';
import firebase from '../utils/firebase';
import Input from '../components/input'
import Button from '../components/button'
import Card from '../components/card'
import OrderItens from '../components/order-itens'
import OrderInPreparation from '../components/order-in-preparation'

function Waiter () {
	const [ menu, setMenu ] = useState([]);
	const [ isBreakfast, setIsBreakfast ] = useState('breakfast');

	useEffect(() => {
		firebase
			.firestore()
			.collection('menu')
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
				<Card key={index} id={menu.id} name={menu.name} price={menu.price} onClick={() => addItem(menu)}/>
			)
		} else {
			return menu.filter(item => item.type === 'all day').map((menu,index) => 
				<Card key={index} id={menu.id} name={menu.name} price={menu.price} onClick={() => addItem(menu)}/>
			)
		}
	}

	const handleClick = (type) => {
		setIsBreakfast(type)
	}

	const [ order, setOrder ] = useState([]);
	const [ total, setTotal ] = useState(0)

	const addItem = (item) => {
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
				dateStart: new Date(),
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
			.onSnapshot(snapshot => {
				const orderDone = snapshot.docs.map(doc => ({
          id: doc.id,
					...doc.data()
				}))
				setOrderDone(orderDone)
			})
  }, [])

  const renderDoneOrder = () => {
		return orderDone.filter(item => item.status === 'Pronto').map((item,index) =>
			<OrderInPreparation key={index} id={item.id} client={item.client} table={item.table} 
			status={item.status}
			order={item.order.map(item => <div>{item.quantity} {item.name}</div>)}
			title={'Pedido entregue'}
			onClick={()=> orderFinished(item)}
			/>
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
		<h1>
			Realizar pedido
		</h1>
		<form>
			<div>
				<Input label={'Nome:'} type={'text'} value={client} onChange={e => setClient(e.currentTarget.value)}/>
				<Input label={'Mesa:'} type={'number'} value={table} onChange={e => setTable(e.currentTarget.value)}/>
			</div>
		</form>
		<div>
			<Button onClick={() => handleClick('breakfast')} title={'Café da manhã'}/>
			<Button onClick={() => handleClick('all day')} title={'Almoço e jantar'}/>
		</div>
		<div>
			<ul>
				{renderMenu()}
			</ul>
		</div>
		<div>
			{order.map((item, index) => 
			<OrderItens key={index} quantity={item.quantity} name={item.name} price={item.price}
			onClick={() => deleteItem(item) }/>
			)}
			Total: R${total}
		</div>
		<div>
			<Button onClick={sendOrder} title={'Enviar pedido'}/>
		</div>
		<h1>
			Pedidos para Entrega
		</h1>
		<div>
			{renderDoneOrder()}
		</div>
		</>
	);
};

export default Waiter