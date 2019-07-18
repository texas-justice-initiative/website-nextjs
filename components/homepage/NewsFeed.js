import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class NewsFeed extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <h2>Relevant News</h2>
          <p>
            A section for Eva and others to post excerpts and links to stories that may be interesting to TJI readers.
          </p>
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
