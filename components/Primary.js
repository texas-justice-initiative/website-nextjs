import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Primary = props => <StyledDiv />;

export default Primary;

const StyledDiv = styled.div`
  padding: 1em;

  @media screen and (min-width: ${props => props.theme.breakpoints.small}) {
    padding: 2em;
    width: 75%;
  }
`;
