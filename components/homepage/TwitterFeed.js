import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

class TwitterFeed extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <h3>Twitter Feed</h3>
          <ul>
            <li>
              <h4>Twitter Story 1</h4>
              <p>Excerpt from this tweet that is clickable so the user can go to read more.</p>
            </li>
            <li>
              <h4>Twitter Story 2</h4>
              <p>Excerpt from this tweet that is clickable so the user can go to read more.</p>
            </li>
            <li>
              <h4>Twitter Story 3</h4>
              <p>Excerpt from this tweet that is clickable so the user can go to read more.</p>
            </li>
          </ul>
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="JusticeTexas"
          />
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default TwitterFeed;

const Wrapper = styled.div`
  order: 2;
  width: 100%;
  margin: 2em 0;

  h3 {
    padding-bottom: 1em;
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
    order: 1;
    width: 33.33%;
    padding-right: 2em;
    border-right: 3px solid ${props => props.theme.colors.black};
  }
`;
