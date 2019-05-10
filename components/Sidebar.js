import React from 'react';
import styled from 'styled-components';

const Sidebar = props => <StyledAside>{props.children}</StyledAside>;

export default Sidebar;

const StyledAside = styled.aside`
  padding: 1em;
  width: 100%;
  background-color: ${props => props.theme.colors.primaryBlue};
  color: ${props => props.theme.colors.white};

  h3 {
    color: ${props => props.theme.colors.white};
    border-bottom: 1px solid ${props => props.theme.colors.white};
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
    margin-top: 4rem;
    padding: 2em;
    width: 33.33%;
    box-shadow: -2px 0 3px rgba(65, 65, 65, 0.5);
    min-height: calc(100vh - 100px);
  }
`;
