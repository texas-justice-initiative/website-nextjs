/* eslint-disable react/destructuring-assignment, react/prop-types, react/destructuring-assignment, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, no-restricted-globals */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AutocompleteInput from './AutocompleteInput';
import CheckboxGroup from './CheckboxGroup';
import FilterContainer from './FilterContainer';

class FilterPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: false };

    this.togglePanel = this.togglePanel.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  resize() {
    const currentWidth = window.innerWidth <= 760;
    if (currentWidth !== this.state.collapsed) {
      this.setState({ collapsed: currentWidth });
    }
  }

  togglePanel() {
    this.setState((state) => ({
      collapsed: !state.collapsed,
    }));
  }

  render() {
    const { filterConfigs, allUniqueRecords, handler, isChecked, dataLoaded, handleAutocompleteSelection, updateAll } =
      this.props;

    if (dataLoaded) {
      return (
        <StyledAside className={!this.state.collapsed ? 'open' : 'closed'}>
          <header onClick={this.togglePanel}>
            <h4>Filter Data</h4>
            <span className="filter-panel__toggle">&#8592;</span>
          </header>
          <p>Use the options below to narrow down the data and view more specific trends.</p>
          <form name="filter-panel__checkbox-groups">
            {Object.keys(filterConfigs).map((filterConfig) => {
              const { type, name } = filterConfigs[filterConfig];

              switch (type) {
                case 'autocomplete':
                  return (
                    <FilterContainer key={name} name={name}>
                      <AutocompleteInput
                        name={name}
                        options={allUniqueRecords[name]}
                        handler={handler}
                        isChecked={isChecked}
                        handleAutocompleteSelection={handleAutocompleteSelection}
                        updateAll={updateAll}
                      />
                    </FilterContainer>
                  );
                default:
                  return (
                    <FilterContainer key={name} name={name}>
                      <CheckboxGroup
                        name={name}
                        values={allUniqueRecords[name]}
                        handler={handler}
                        isChecked={isChecked}
                        valueDecorator={(value) => (isNaN(value) ? value.toLowerCase() : value)}
                        updateAll={updateAll}
                      />
                    </FilterContainer>
                  );
              }
            })}
          </form>
        </StyledAside>
      );
    }
    return (
      <StyledAside className={!this.state.collapsed ? 'open open--data-not-loaded' : 'closed'}>
        <header>
          <h4>Filter Data</h4>
          <span className="filter-panel__toggle" onClick={this.togglePanel}>
            &#8592;
          </span>
        </header>
        <p>Use the options below to narrow down the data and view more specific trends.</p>
      </StyledAside>
    );
  }
}

/*
 */
export default FilterPanel;

FilterPanel.propTypes = {
  filterConfigs: PropTypes.array,
  allUniqueRecords: PropTypes.object,
  handler: PropTypes.func.isRequired,
  isChecked: PropTypes.object,
  dataLoaded: PropTypes.bool,
  handleAutocompleteSelection: PropTypes.func.isRequired,
};

const StyledAside = styled.aside`
  background-color: ${(props) => props.theme.colors.primaryBlue};
  color: ${(props) => props.theme.colors.white};
  transition: all 0.5s;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2;
  overflow: auto;

  /* Extend panel background to bottom of viewport on mobile until data is loaded */
  &.open--data-not-loaded {
    bottom: 0;
  }

  /* Collapsed panel styles */
  &.closed {
    p,
    fieldset {
      display: none;
    }

    header {
      .filter-panel__toggle {
        transform: rotate(90deg);
      }
    }
  }

  header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: ${(props) => props.theme.colors.secondaryBlue};
    padding: 2rem 4rem;
    position: sticky;
    top: 0;
    height: 50px;
    cursor: pointer;

    h4 {
      color: ${(props) => props.theme.colors.white};
      text-transform: uppercase;
    }

    .filter-panel__toggle {
      display: inline-block;
      cursor: pointer;
      font-size: 2.6rem;
      transform: rotate(-90deg);
      transition: transform 0.5s;
    }
  }

  p {
    margin: 2rem 4rem;
    font-size: ${(props) => props.theme.typography.sizes.body.small};
    line-height: 1.25;
  }

  /** Mobile filter panel */
  @media screen and (max-width: ${(props) => props.theme.breakpoints.small}) {
    height: calc(100vh - 25%);

    &.closed {
      height: 50px;
    }
  }

  /* Desktop filter panel */
  @media screen and (min-width: ${(props) => props.theme.breakpoints.medium}) {
    box-shadow: -2px 0 3px rgba(65, 65, 65, 0.5);
    min-height: calc(100vh - 100px);
    position: relative;
    width: 300px;

    &.closed {
      width: 50px;
      header {
        justify-content: center;
        padding: 2rem 0;

        .filter-panel__toggle {
          transform: rotate(-180deg);
        }

        h4 {
          display: none;
        }
      }
    }

    header {
      position: relative;
      .filter-panel__toggle {
        transform: rotate(0deg);
      }
    }
  }
`;
