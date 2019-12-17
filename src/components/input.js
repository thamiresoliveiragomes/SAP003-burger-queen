import React from 'react';

function Input(props) {
  return (
    <div>
      <label>{props.label}</label>
      <input type={props.type} className={props.class} value={props.value} onChange={props.onChange}/>
    </div>
  );
}

export default Input;