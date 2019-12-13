import React, {useState} from 'react';
// import logo from './logo.svg';
// import './App.css';


function Counter() {
    const [counter, setCounter] = useState(0)
    //counter = valor salvo
    //setCounter = atualiza o estado
    //useState = valor inicial
  return (
    <>
		<p>{counter}</p>
    <Button handleClick={() =>setCounter(counter +1)} title={"Contador"}/>
    </>
  );
}

function Button (props) {
  return (
  <button onClick={props.handleClick}>{props.title}</button>
  );
};

export default Counter;
