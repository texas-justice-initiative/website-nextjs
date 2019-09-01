import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

class TwitterFeed extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <TwitterTimelineEmbed sourceType="profile" screenName="JusticeTexas" options={{ height: 600 }} />
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default TwitterFeed;

const Wrapper = styled.div`
  order: 2;
  width: 100%;
  margin: 4em 0;

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
