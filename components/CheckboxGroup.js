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
      <Fieldset>
        <legend onClick={this.toggleCheckboxGroup}>
          {name.replace(/_/g, ' ')} <span className="checkbox-group__toggle">&#9660;</span>
        </legend>
        {values.map(value => (
          <div className={!this.state.collapsed ? 'open' : 'closed'}>
            <div>
              <input onChange={handler} id={value} type="checkbox" name={name} defaultChecked="checked" value={value} />
              <label htmlFor={value}>{isNaN(value) ? value.toLowerCase() : value}</label>
            </div>
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

  > div {

    &.open {
      max-height: 500px;
      overflow-y: hidden;

      > div {
        opacity: 1;
      }
    }

    &.closed {
      max-height: 0;

      > div {
        opacity: 0;
      }
    }
  }

  legend {
    cursor: pointer;
    padding: 0 0.5rem;
    font-weight: 800;
    text-transform: capitalize;
    white-space: normal;
  }
`;
