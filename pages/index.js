import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Primary from '../components/Primary';
import Banner from '../components/homepage/Banner';
import TwitterFeed from '../components/homepage/TwitterFeed';
import NewsFeed from '../components/homepage/NewsFeed';
import DataCharts from '../components/homepage/DataCharts';

const pageTitle = 'Home Page';

const Index = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Primary fullWidth="true">
      <FlexWrap>
        <Banner></Banner>
        <TwitterFeed></TwitterFeed>
        <NewsFeed></NewsFeed>
        <DataCharts></DataCharts>
      </FlexWrap>
    </Primary>
  </React.Fragment>
);

export default Index;

const FlexWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
