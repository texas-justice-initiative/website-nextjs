import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class TwitterFeed extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          Twitter Feed
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default TwitterFeed;

const Wrapper = styled.div`
  width: 100%;

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 33.33%;
  }
`;
