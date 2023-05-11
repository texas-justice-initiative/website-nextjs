'use client';

/* eslint-disable react/jsx-no-bind */

import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import HomepageNewsFeed from '../components/homepage/HomepageNewsFeed';
import StateofData from '../components/homepage/StateofData';
import MultiChart from '@/components/MultiChart/MultiChart';

export default function Index() {
  return (
    <>
      <Layout>
        <Primary>
          <FlexWrap>
            <div className="mission-statement">
              Texas Justice Initiative is a nonprofit organization that
              collects, analyzes, publishes and provides oversight for criminal
              justice data throughout Texas.
            </div>
            <MultiChart />
            <div className="divider--large divider--blue" />
            <HomepageNewsFeed />
            <StateofData />
          </FlexWrap>
        </Primary>
      </Layout>
    </>
  );
}

const FlexWrap = styled.div`
  display: flex;
  flex-flow: row wrap;

  .mission-statement {
    color: #000000;
    font-size: 2.8rem;
    letter-spacing: 2px;
    line-height: 4.5rem;
    max-width: 860px;
    margin: 0 auto;
    padding: 3rem;
    text-align: center;
  }
`;
