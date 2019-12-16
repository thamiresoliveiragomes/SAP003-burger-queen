import React from 'react';
import Button from './button'

function Card (props) {
  return (
    <li key={props.id}>
			<div>
			{props.name} R${props.price}
			</div>
			<Button onClick={props.onClick} title={'Adicionar'}/>
		</li>
  );
};

export default Card