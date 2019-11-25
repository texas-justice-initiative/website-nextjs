import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Sidebar = props => {
  const { children } = props;
  return <StyledAside className="sidebar sidebar--subtle">{children}</StyledAside>;
};

export default Sidebar;

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

const StyledAside = styled.aside`
  flex: 1 0 342px;
  padding: 1em;
  width: 100%;

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: ${props => props.theme.large} / 3;
  }
`;
