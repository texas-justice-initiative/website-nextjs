import React from 'react';
import styled from 'styled-components';

class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState(state => ({
      collapsed: !state.collapsed,
    }));
  }

  render() {
    const { name, children } = this.props;
    const { collapsed } = this.state;
    return (
      <Fieldset>
        <legend className={!collapsed ? 'open' : 'closed'}>
          <button type="button" onClick={this.toggleCollapsed}>
            {name.replace(/_/g, ' ')} <span className="checkbox-group__toggle">&#9660;</span>
          </button>
        </legend>
        <div className={!collapsed ? 'open' : 'closed'}>{children}</div>
      </Fieldset>
    );
  }
}

export default FilterContainer;

const Fieldset = styled.fieldset`
  margin: 2rem 4rem;
  padding: 0.35em 0.75em 0.625em;

  > div {
    &.open {
      max-height: 500px;
      overflow-y: hidden;
      opacity: 1;
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
    padding: 0 0.5rem;
    font-weight: 800;
    white-space: normal;

    button {
      text-transform: capitalize;
      text-decoration: none;
      cursor: pointer;
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      outline: inherit;
    }

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
