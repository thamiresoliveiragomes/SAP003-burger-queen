import React, {useState, useEffect} from 'react';
import firebase from '../utils/firebase';
import Input from '../components/input'
import Button from '../components/button'
import Card from '../components/card'
import Order from '../components/order'

function Waiter () {
	const [ menu, setMenu ] = useState([]);
	const [ isBreakfast, setIsBreakfast ] = useState('breakfast');

	useEffect(() => {
		firebase
			.firestore()
			.collection('menu')
			.onSnapshot(snapshot => {
				const menu = snapshot.docs.map(doc => ({
					...doc.data()
				}))
				setMenu(menu)
			})
	}, [])

	const renderMenu = () => {
		if (isBreakfast === 'breakfast') {
			return menu.filter(item => item.type === 'breakfast').map((menu, index) =>
				<Card key={index} name={menu.name} price={menu.price} onClick={() => addItem(menu)}/>
			)
		} else {
			return menu.filter(item => item.type === 'all day').map((menu,index) => 
				<Card key={index} name={menu.name} price={menu.price} onClick={() => addItem(menu)}/>
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
			item.count = 1
			setOrder([...order, item ])
		} else {
			item.count += 1
      setOrder([...order])
		}
		setTotal(total + item.price)
	}

	const deleteItem = (item) => {
		const updateTotal = total - item.price
		if (item.count === 1){
			const index = order.indexOf(item)
			order.splice(index, 1)
			setOrder([...order])
			setTotal(updateTotal)
		} else {
      item.count -= 1
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
				date: new Date(),
				client,
				table: Number(table),
				order,
				total
			})
			.then(
				setClient(''),
				setTable(''),
				setOrder([]),
				setTotal(0)
			)
	}

  return (
		<>
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
			<Order key={index} quantity={item.count} name={item.name} price={item.price} onClick={() => deleteItem(item) }/>
			)}
			Total: R${total}
		</div>
		<div>
			<Button onClick={sendOrder} title={'Enviar pedido'}/>
		</div>
		</>
	);
};

export default Waiter