import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Primary from '../components/Primary';
import Banner from '../components/homepage/Banner';
import TwitterFeed from '../components/homepage/TwitterFeed';
import NewsFeed from '../components/homepage/NewsFeed';
import StateofData from '../components/homepage/StateofData';
import DataCharts from '../components/homepage/DataCharts';

const pageTitle = 'Home Page';

class Index extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <Primary fullWidth="true">
          <FlexWrap>
            <Banner></Banner>
            <TwitterFeed></TwitterFeed>
            <NewsFeed></NewsFeed>
            <StateofData></StateofData>
            <DataCharts></DataCharts>
          </FlexWrap>
        </Primary>
      </React.Fragment>
    )
  }
}

export default Index;

const FlexWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
