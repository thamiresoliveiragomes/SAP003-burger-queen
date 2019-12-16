import React from 'react';

function Input(props) {
  return (
    <input type={props.type} className={props.class}/>
  );
}

export default Input;