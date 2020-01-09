import React from 'react';

function Button (props) {
  return (
  <button className={props.className} onClick={props.onClick}>
    <img src={props.img} alt='' className={props.classImg}/>
    {props.title}
  </button>
  );
};

export default Button;