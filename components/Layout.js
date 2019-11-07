import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Layout = props => <StyledDiv width={props.width}>{props.children}</StyledDiv>;

export default Layout;

Layout.propTypes = {
  width: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  width: 'fixed',
};

const StyledDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  width: 100%;
  max-width: ${props => (props.width === 'fluid' ? '100%' : props.theme.large)};
  margin: ${props => (props.width === 'fluid' ? '0' : '4rem auto')};

  @media (min-width: ${props => props.theme.medium}) {
    flex-flow: row nowrap;
  }

  @media (min-width: ${props => props.theme.medium}) and (max-width: calc(1028px + 2rem)) {
    padding: 0 2rem;
  }
`;
