import React from 'react';
import Button from './button'

function Card (props) {
  return (
    <li key={props.id}>
			<div>
			<Button onClick={props.onClick} title={[props.name, ' R$', props.price]}/>
			</div>
		</li>
  );
};

export default Card