import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Primary = props => {
  const { children } = props;
  return <StyledDiv>{children}</StyledDiv>;
};

export default Primary;

Primary.propTypes = {
  children: PropTypes.node.isRequired,
};

const StyledDiv = styled.main`
  padding: 1em;
  width: 100%;
  margin: 0 auto;

  @media screen and (min-width: ${props => props.theme.medium}) {
    padding: 0 4rem 0 0;
    width: ${props => (props.fullWidth ? '100%' : 'auto')};
  }
`;
