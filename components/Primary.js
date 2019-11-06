/* eslint-disable no-unused-vars, react/destructuring-assignment */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const Primary = props => <StyledDiv fullWidth={props.fullWidth}>{props.children}</StyledDiv>;

export default Primary;

Primary.propTypes = {
  fullWidth: PropTypes.bool,
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
