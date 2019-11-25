import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Looks for width prop to be either 'fixed', or 'fluid'
const Layout = props => {
  const { fullWidth, children } = props;
  return <StyledDiv fullWidth={fullWidth}>{children}</StyledDiv>;
};

export default Layout;

Layout.propTypes = {
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  fullWidth: false,
};

const StyledDiv = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  width: 100%;
  max-width: ${props => (props.fullWidth ? '100%' : props.theme.large)};
  margin: ${props => (props.fullWidth ? '0' : '4rem auto')};

  @media (min-width: ${props => props.theme.medium}) {
    flex-flow: row nowrap;
  }

  @media (min-width: ${props => props.theme.medium}) and (max-width: calc(${props => props.theme.large} + 2rem)) {
    padding: 0 2rem;
  }
`;
