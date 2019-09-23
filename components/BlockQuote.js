/* eslint-disable react/destructuring-assignment */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BlockQuote = props => (
  <StyledDiv>
    <p>{props.children}</p>
  </StyledDiv>
);

export default BlockQuote;

BlockQuote.propTypes = {
  children: PropTypes.string.isRequired,
};

const StyledDiv = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primaryBlue};
  letter-spacing: 2px;
  font-style: italic;
  margin: 4rem 1rem 4rem 0;
  text-align: right;
`;
