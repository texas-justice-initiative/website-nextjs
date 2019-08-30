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
    const { name, values, handler, isChecked } = this.props;
    return (
      <Fieldset>
        <legend onClick={this.toggleCheckboxGroup} className={!this.state.collapsed ? 'open' : 'closed'}>
          {name.replace(/_/g, ' ')} <span className="checkbox-group__toggle">&#9660;</span>
        </legend>
        {values.map(value => (
          <div key={value} className={!this.state.collapsed ? 'open' : 'closed'}>
            <label htmlFor={value}>
              <input
                onChange={handler}
                id={value}
                type="checkbox"
                name={name}
                checked={isChecked[name][value]}
                value={value}
              />
              {isNaN(value) ? value.toLowerCase() : value}
            </label>
          </div>
        ))}
      </Fieldset>
    );
  }
}

export default CheckboxGroup;

const Fieldset = styled.fieldset`
  margin: 2rem 4rem;
  padding: 0.35em 0.75em 0.625em;

  > div {
    &.open {
      max-height: 500px;
      overflow-y: hidden;
      opacity: 1
    }

    &.closed {
      max-height: 0;
      opacity: 0;
    }
  }

  input {
    margin-right: 0.5rem;
  }

  legend {
    cursor: pointer;
    padding: 0 0.5rem;
    font-weight: 800;
    text-transform: capitalize;
    white-space: normal;

    &.closed {
      .checkbox-group__toggle {
        transform: rotate(180deg);
      }
    }

    .checkbox-group__toggle {
      display: inline-block;
      transition: transform 0.5s;
    }
  }
`;
