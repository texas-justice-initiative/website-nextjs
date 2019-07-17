import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class TwitterFeed extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Column>
          Twitter Feed
        </Column>
      </React.Fragment>
    )
  }
}

export default TwitterFeed;

const Column = styled.div`
  width: 100%;

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 33.33%;
  }
`;
