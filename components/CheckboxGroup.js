import React from 'react';

const CheckboxGroup = ({ name, values, handler }) => (
  <fieldset>
    <legend>{name}</legend>
    {values.map(value => (
      <div>
        <input onChange={handler} id={value} type="checkbox" name={name} defaultChecked="checked" value={value} />
        <label htmlFor={value}>{isNaN(value) ? value.toLowerCase() : value}</label>
      </div>
    ))}
  </fieldset>
);

export default CheckboxGroup;
