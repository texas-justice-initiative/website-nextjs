import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class TwitterFeed extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <h2>Twitter Feed</h2>
          <ul>
            <li>
              <h3>Twitter Story 1</h3>
              <p>Excerpt from this tweet that is clickable so the user can go to read more.</p>
            </li>
            <li>
              <h3>Twitter Story 2</h3>
              <p>Excerpt from this tweet that is clickable so the user can go to read more.</p>
            </li>
            <li>
              <h3>Twitter Story 3</h3>
              <p>Excerpt from this tweet that is clickable so the user can go to read more.</p>
            </li>
          </ul>
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
