/* eslint-disable react/destructuring-assignment */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Sidebar = props => <StyledAside>{props.children}</StyledAside>;

export default Sidebar;

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

const StyledAside = styled.aside`
  flex: 1 0 342px;
  padding: 1em;
  width: 100%;
  background-color: ${props => props.theme.colors.primaryBlue};
  color: ${props => props.theme.colors.white};

  h3 {
    color: ${props => props.theme.colors.white};
    border-bottom: 1px solid ${props => props.theme.colors.white};
  }

  a {
    color: ${props => props.theme.colors.primaryYellow};
  }

  p {
    font-size: ${props => props.theme.sidebarFont__size};
    line-height: 1.25;
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
    padding: 2em;
    width: 342px; /* props.theme.large / 3 */
    box-shadow: -2px 0 3px rgba(65, 65, 65, 0.5);
    min-height: calc(100vh - 100px);
  }
`;
