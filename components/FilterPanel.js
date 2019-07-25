import React from 'react';
import styled from 'styled-components';

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
    let currentWidth = window.innerWidth <= 760;
    if (currentWidth !== this.state.collapsed) {
      this.setState({ collapsed: currentWidth });
    }
  }

  togglePanel() {
    this.setState(state => ({
      collapsed: !state.collapsed,
    }));
  }

  render() {
    const { name, values, handler } = this.props;
    return (
      <StyledAside className={!this.state.collapsed ? 'open' : 'closed'}>
        <header>
          <h4>Filter Data</h4>
          <span className="filter-panel__toggle" onClick={this.togglePanel}>
            &#8592;
          </span>
        </header>
        <p>Use the options below to narrow down the data and view more specific trends.</p>
        {this.props.children}
      </StyledAside>
    )
  }
};

export default FilterPanel;

const StyledAside = styled.aside`
  width: calc(100% - 50px);
  background-color: ${props => props.theme.colors.primaryBlue};
  color: ${props => props.theme.colors.white};
  transition: width 0.5s;

  /* Collapsed panel styles */
  &.closed {
    width: 50px;

    header h4,
    p,
    fieldset {
      display: none;
    }

    header {
      justify-content: center;
      padding: 2rem 0;

      .filter-panel__toggle {
        transform: rotate(-180deg);
      }
    }
  }
  /* End collapsed styles */

  header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    background-color: ${props => props.theme.colors.secondaryBlue};
    padding: 2rem 4rem;

    h4 {
      color: ${props => props.theme.colors.white};
      text-transform: uppercase;
    }

    .filter-panel__toggle {
      display: inline-block;
      cursor: pointer;
      font-size: 2.6rem;
      transition: transform 0.5s;
    }
  }

  p {
    margin: 2rem 4rem;
    font-size: ${props => props.theme.sidebarFont__size};
    line-height: 1.25;
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 25%;
    box-shadow: -2px 0 3px rgba(65, 65, 65, 0.5);
    min-height: calc(100vh - 100px);
  }
`;