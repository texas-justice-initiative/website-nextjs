import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Looks for width prop to be either 'fixed', or 'fluid'
const Layout = props => {
  const { fullWidth, flexColumn, children } = props;
  return (
    <StyledDiv fullWidth={fullWidth} flexColumn={flexColumn}>
      {children}
    </StyledDiv>
  );
};

export default Layout;

Layout.propTypes = {
  fullWidth: PropTypes.bool,
  flexColumn: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {
  fullWidth: false,
  flexColumn: false,
};

const StyledDiv = styled.div`
  display: flex;
  flex-flow: ${props => (props.flexColumn ? 'column' : 'row wrap')};
  align-items: flex-start;
  width: 100%;
  max-width: ${props => (props.fullWidth ? '100%' : props.theme.site.maxWidth)};
  margin: ${props => (props.fullWidth ? '0' : '4rem auto')};

  @media (min-width: ${props => props.theme.breakpoints.medium}) {
    flex-flow: ${props => (props.flexColumn ? 'column' : 'row nowrap')};
  }

  @media (min-width: ${props => props.theme.breakpoints.medium}) and (max-width: calc(${props =>
  props.theme.breakpoints.large} + 2rem)) {
    padding: 0 2rem;
  }
`;
