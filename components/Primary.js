import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

const Primary = props => <StyledDiv fullWidth={props.fullWidth}>{props.children}</StyledDiv>;

export default Primary;

Primary.propTypes = {
  fullWidth: PropTypes.bool,
  children: PropTypes.object,
};

const StyledDiv = styled.main`
  padding: 1em;
  width: 100%;
  margin: 0 auto;

  @media screen and (min-width: ${props => props.theme.medium}) {
    padding: 2em 4rem;
    width: ${props => (props.fullWidth ? '100%' : '75%')};
  }

  @media screen and (min-width: ${props => props.theme.large}) {
    padding: ${props => (props.fullWidth ? '2em 0' : '2em 4rem')};
    max-width: ${props => (props.fullWidth ? props.theme.large : '75%')};
  }
`;
