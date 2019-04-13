import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const Primary = props => <StyledDiv>{props.children}</StyledDiv>;

export default Primary;

const StyledDiv = styled.main`
  padding: 1em;
  flex: 3;

  @media screen and (min-width: ${props => props.theme.medium}) {
    padding: 2em;
    width: 75%;
  }
`;
