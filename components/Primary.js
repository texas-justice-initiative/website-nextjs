import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Primary = props => {
  const { fullWidth, children } = props;
  return <StyledDiv fullWidth={fullWidth}>{children}</StyledDiv>;
};

export default Primary;

Primary.propTypes = {
  fullWidth: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Primary.defaultProps = {
  fullWidth: false,
};

const StyledDiv = styled.main`
  padding: 1em;
  width: 100%;
  margin: 0 auto;

  @media screen and (min-width: ${props => props.theme.breakpoints.medium}) {
    padding: 0 4rem;
    width: ${props => (props.fullWidth ? '100%' : 'auto')};
  }
`;
