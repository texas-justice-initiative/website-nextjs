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
  order: 1;
  width: 100%;
  margin: 4em 0;

  h2 {
    color: ${props => props.theme.colors.black};
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
    order: 2;
    width: 66.66%;
    padding-left: 2em;
  }
`;
