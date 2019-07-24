import React from 'react';
import styled from 'styled-components';

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };

    this.toggleCheckboxGroup = this.toggleCheckboxGroup.bind(this);
  }

  toggleCheckboxGroup() {
    this.setState(state => ({
      collapsed: !state.collapsed,
    }));
  }

  render() {
    const { name, values, handler } = this.props;
    return (
      <Fieldset className={this.state.collapsed}>
        <legend onClick={this.toggleCheckboxGroup}>
          {name.replace(/_/g, ' ')} <span className="checkbox-group__toggle">&#9660;</span>
        </legend>
        {values.map(value => (
          <div>
            <input onChange={handler} id={value} type="checkbox" name={name} defaultChecked="checked" value={value} />
            <label htmlFor={value}>{isNaN(value) ? value.toLowerCase() : value}</label>
          </div>
        ))}
      </Fieldset>
    );
  }
}

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
