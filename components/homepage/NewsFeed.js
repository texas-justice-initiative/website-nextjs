import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class NewsFeed extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Column>
          News Feed
        </Column>
      </React.Fragment>
    )
  }
}

export default NewsFeed;

const Column = styled.div`
  width: 100%;

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 66.66%;
  }
`;
