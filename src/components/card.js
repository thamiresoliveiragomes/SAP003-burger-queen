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
    props.onClick({...props.menu, extras: extras, options: options})
  }

  const renderExtrasAndOption = () => {
    if (showItem) {
      return (
        <>
        {
          props.extras.map(extra => {
            return (
          <>
          <label>{extra}</label>
          <input type="checkbox" checked={extras.indexOf(extra) !== -1} onClick={() => handleExtra(extra)}/>
          </>
          )})
        }
        {
          props.options.map(extra => (
            <>
            <label>{extra}</label>
            <input type="radio" value={extra} checked={options === extra} onClick={() => setOptions(extra)}/>
            </>
            ))
        }
        <Button onClick={handleSubmit} title="Enviar"/> 
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