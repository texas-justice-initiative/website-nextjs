import React from 'react';
import styled from 'styled-components';

const CheckboxGroup = ({ name, values, handler }) => (
  <Fieldset>
    <legend>
      {name} <span className="checkbox-group__toggle">&#9660;</span>
    </legend>
    {values.map(value => (
      <div>
        <input onChange={handler} id={value} type="checkbox" name={name} defaultChecked="checked" value={value} />
        <label htmlFor={value}>{isNaN(value) ? value.toLowerCase() : value}</label>
      </div>
    ))}
  </Fieldset>
);

export default CheckboxGroup;

const Fieldset = styled.fieldset`
  margin: 2rem 0;
  padding: 0.35em 0.75em 0.625em;

  legend {
    cursor: pointer;
    padding: 0 0.5rem;
    font-weight: 800;
    text-transform: capitalize;
    white-space: normal;
  }
`;
