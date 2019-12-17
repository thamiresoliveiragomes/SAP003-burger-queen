import React from 'react';

function Button (props) {
  return (
  <button className={props.class} onClick={props.onClick}>{props.title}{props.description}</button>
  );
};

export default Button;