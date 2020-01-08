import React, {useState} from 'react';
import Button from './button'

function Card (props) {
  const [extras, setExtras] = useState([]);
  const [options, setOptions] = useState("");
  const [showItem, setShowItem] = useState(false);

  const handleExtra = (extra) => {
    const extraIndex = extras.indexOf(extra);
    const foundItem = extraIndex !== -1;
    if(foundItem) {
      setExtras(extras.filter(i => i !== extra))
    } else {
      setExtras([...extras, extra])
    }
  }

  const handleSubmit = () => {
    props.onClick({...props.menu, extras, options})
    setShowItem(false)
  }

  const renderExtrasAndOption = () => {
    if (showItem) {
      return (
        <>
        <div>
        {
          props.options.map(option => (
            <>
            <input type="radio" value={option} checked={options === option} onClick={() => setOptions(option)}/>
            <label>{option}</label>
            </>
            ))
        }
        </div>
        <div>
        {
          props.extras.map(extra => {
            return (
          <>
          <input type="checkbox" checked={extras.indexOf(extra) !== -1} onClick={() => handleExtra(extra)}/>
          <label>{extra} (+ R$1)</label>
          </>
          )})
        }
        <Button onClick={handleSubmit} title="Adicionar"/> 
        </div>
        </>
      )
    } else {
      return null;
    }
  }

  return (
    <li id={props.id}>
			<Button onClick={() => props.options ? setShowItem(!showItem) : props.onClick(props.menu)} title={[props.name, ' R$', props.price]}/> 
      {renderExtrasAndOption()}
		</li>
  );
};

export default Card