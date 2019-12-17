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
					id: doc.id,
					...doc.data()
				}))
				setMenu(menu)
			})
	}, [])

	const renderMenu = () => {
		if (isBreakfast === 'breakfast') {
			return menu.filter(item => item.type === 'breakfast').map(menu =>
				<Card id={menu.id} name={menu.name} price={menu.price} onClick={() => addItem(menu)}/>
			)
		} else {
			return menu.filter(item => item.type === 'all day').map(menu => 
				<Card id={menu.id} name={menu.name} price={menu.price} onClick={() => addItem(menu)}/>
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

  return (
		<>
		<form>
			<div>
				<label>Nome:</label>
				<Input type={'text'}/>
			</div>
			<div>
				<label>Mesa:</label>
				<Input type={'number'}/>
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
			{order.map(item => 
			<Order quantity={item.count} name={item.name} price={item.price} onClick={() => deleteItem(item) }/>
			)}
			Total: R${total}
		</div>
		</>
	);
};

export default Waiter