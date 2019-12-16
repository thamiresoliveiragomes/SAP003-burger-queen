import React, {useState, useEffect} from 'react';
import firebase from '../utils/firebase';
import Input from '../components/input'
import Button from '../components/button'
import Card from '../components/card'

function Waiter () {
	const [ menu, setMenu ] = useState([]);
	const [ isBreakfast, setIsBreakfast ] = useState("breakfast");
	

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
				<Card id={menu.id} name={menu.name} price={menu.price}/>
			)
		} else {
			return menu.filter(item => item.type === 'all day').map(menu => 
				<Card id={menu.id} name={menu.name} price={menu.price}/>
			)
		}
	}

	const handleClick = (type) => {
		setIsBreakfast(type)
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
		</>
	);
};

export default Waiter