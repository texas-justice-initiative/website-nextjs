import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class NewsFeed extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          News Feed
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default NewsFeed;

const Wrapper = styled.div`
  width: 100%;

  @media screen and (min-width: ${props => props.theme.medium}) {
    width: 66.66%;
  }
`;
