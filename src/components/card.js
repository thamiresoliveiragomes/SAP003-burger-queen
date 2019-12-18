import React from 'react';
import Button from './button'

function Card (props) {
  return (
    <li id={props.id}>
			<Button onClick={props.onClick} title={[props.name, ' R$', props.price]}/>
		</li>
  );
};

export default Card