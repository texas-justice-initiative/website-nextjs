import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@/components/Button';

class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true };
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState((state) => ({
      collapsed: !state.collapsed,
    }));
  }

  render() {
    const { name, children } = this.props;
    const { collapsed } = this.state;
    return (
      <Fieldset>
        <legend className={!collapsed ? 'open' : 'closed'}>
          <Button onClick={this.toggleCollapsed}>
            {name.replace(/_/g, ' ')}{' '}
            <span className="checkbox-group__toggle">&#9660;</span>
          </Button>
        </legend>
        <div className={!collapsed ? 'open' : 'closed'}>{children}</div>
      </Fieldset>
    );
  }
}

export default FilterContainer;

FilterContainer.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const Fieldset = styled.fieldset`
  margin: 2rem 4rem;
  padding: 0.35em 0.75em 0.625em;

  > div {
    overflow-x: hidden;
    overflow-y: hidden;
    -webkit-transition: max-height 0.5s;
    -moz-transition: max-height 0.5s;
    -ms-transition: max-height 0.5s;
    -o-transition: max-height 0.5s;
    transition: max-height 0.5s;

    &.open {
      max-height: 500px;
    }

    &.closed {
      max-height: 0;
    }
  }

  input {
    margin-right: 0.5rem;
  }

  legend {
    padding: 0 0.25rem;
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
