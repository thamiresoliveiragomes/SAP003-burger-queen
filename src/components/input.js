import React from 'react';
import { StyleSheet, css } from 'aphrodite';

function Input(props) {
  return (
    <div className={css(styles.input)}>
      <label className={css(styles.label)}>{props.label}</label>
      <input type={props.type} className={props.className} value={props.value} onChange={props.onChange}/>
    </div>
  );
};

const styles = StyleSheet.create({
  input: {
    display: 'flex',
    margin: '0 10% 0 10%',
    alignItems: 'center',
  },
  label: {
    marginRight: '4%'
  }

})

export default Input;