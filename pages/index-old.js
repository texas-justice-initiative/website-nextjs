/* eslint-disable react/jsx-no-bind */

import React, { useState } from 'react';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import HomepageNewsFeed from '../components/homepage/HomepageNewsFeed';
import StateofData from '../components/homepage/StateofData';
import datasets from '../data/datasets';
import BarChart from '../components/charts/chartsjs/BarChart';
import ChartNote from '../components/charts/chartsjs/ChartNote';
import theme from '../theme';
import Link from 'next/link';
import useDataset from '../hooks/use-dataset';

const title = 'Home Page';

export default function Index() {
  const [dataset, setDataset] = useState(datasets['custodial-deaths'].slug);
  const { loading, data } = useDataset(dataset);

  // Setup our lookups
  const chartConfigs = datasets[dataset]?.chart_configs;
  const recordKeys = data ? Object.keys(data.records) : [];
  const totalIncidents = data ? data.records[recordKeys[0]].length : 0;
  const allUniqueRecords = data
    ? [...new Set(data.records[recordKeys[0]])]
    : [];

  // todo: This can be done much better
  let h1;

  switch (dataset) {
    case 'custodial-deaths':
      h1 = (
        <h1>
          Since 2005,{' '}
          <span className="text--red">{totalIncidents.toLocaleString()}</span>{' '}
          people have died in the custody of Texas law enforcement, based on
          state-mandated reports.
        </h1>
      );
      break;
    case 'civilians-shot':
      h1 = (
        <h1>
          Since Sept. 2015, Texas peace officers have shot{' '}
          <span className="text--red">{totalIncidents?.toLocaleString()}</span>{' '}
          people, based on state-mandated reports.
        </h1>
      );
      break;
    case 'officers-shot':
      h1 = (
        <h1>
          Since Sept. 2015,{' '}
          <span className="text--red">{totalIncidents?.toLocaleString()}</span>{' '}
          Texas peace officers have been shot, based on state-mandated reports.
        </h1>
      );
      break;
    default:
      h1 = (
        <h1>
          Since 2005,{' '}
          <span className="text--red">{totalIncidents?.toLocaleString()}</span>{' '}
          people have died in the custody of Texas law enforcement, based on
          state-mandated reports.
        </h1>
      );
      break;
  }

  return (
    <>
      <NextSeo
        title={title}
        description="Texas Justice Initiative is a nonprofit organization that collects, analyzes, publishes and provides oversight for criminal justice data throughout Texas."
        openGraph={{
          description:
            'Texas Justice Initiative is a nonprofit organization that collects, analyzes, publishes and provides oversight for criminal justice data throughout Texas.',
        }}
      />
      <Layout>
        <Primary>
          <FlexWrap>
            <div className="mission-statement">
              Texas Justice Initiative is a nonprofit organization that
              collects, analyzes, publishes and provides oversight for criminal
              justice data throughout Texas.
            </div>
            <Banner>
              <div className="banner-wrapper">
                <div className="banner-left">
                  <div className="chartContainer bar-chart bar-chart--container">
                    <h3 className="bar-chart__title">
                      {datasets[dataset].name}
                    </h3>
                    {!loading ? (
                      <React.Fragment>
                        <BarChart
                          title=""
                          recordKeys={allUniqueRecords}
                          records={data.records.year}
                          theme={theme}
                          incompleteYears={chartConfigs[0].incompleteYears}
                        />
                        {chartConfigs[0].note && (
                          <ChartNote note={chartConfigs[0].note} />
                        )}
                      </React.Fragment>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </div>
                </div>
                <div className="banner-right">
                  {Object.keys(datasets).map((datasetName) => (
                    <ChangeChartButton
                      key={datasetName}
                      onClick={() => setDataset(datasetName)}
                      className={
                        datasetName === dataset
                          ? 'btn btn--primary btn--chart-toggle active'
                          : 'btn btn--primary btn--chart-toggle'
                      }
                    >
                      <span className="btn--chart-toggle--text">
                        {datasets[datasetName].name}
                      </span>
                    </ChangeChartButton>
                  ))}
                </div>
                <br />
                <div className="banner-heading">{h1}</div>
                <div className="banner-callout">
                  <span className="banner-callout__text">
                    Want to learn more?
                  </span>
                  <Link href="/data" className="btn btn--primary">
                    Explore the Data
                  </Link>
                </div>
              </div>
            </Banner>
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

const Banner = styled.div`
  order: 0;
  width: 100%;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.medium}) {
    padding: 2rem 0;
  }

  .banner-heading {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;

    @media screen and (min-width: ${(props) =>
        props.theme.breakpoints.medium}) {
      padding: 2rem 0 0;
    }

    h1 {
      text-align: center;
      font-weight: 400;
      border-bottom-width: 0;

      @media screen and (max-width: ${(props) =>
          props.theme.breakpoints.medium}) {
        font-size: 2.25rem;
      }
    }
  }

  .banner-wrapper {
    display: flex;
    flex-flow: row wrap;
    justify-content: stretch;
    width: 100%;
    padding: 2rem 0;

    @media screen and (min-width: ${(props) =>
        props.theme.breakpoints.medium}) {
      background: ${(props) => props.theme.colors.grayLightest};
      padding: 3rem;
      align-items: stretch;
    }
  }

  .banner-left {
    width: 100%;
    margin-bottom: 4rem;

    @media screen and (min-width: ${(props) =>
        props.theme.breakpoints.medium}) {
      width: 75%;
      padding-right: 2rem;
      margin-bottom: 0;
    }

    .bar-chart--container {
      width: 100%;
      height: 100%;
      background: ${(props) => props.theme.colors.grayLightest};
      box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
      padding: 0;
      padding-bottom: 1rem;

      .chart__plot {
        height: 400px;
      }

      @media screen and (min-width: ${(props) =>
          props.theme.breakpoints.medium}) {
        background: ${(props) => props.theme.colors.white};
        padding: 1rem;
      }

      .bar-chart__title {
        text-align: center;
      }
    }
  }

  .banner-right {
    width: 100%;
    font-size: ${(props) => props.theme.typography.sizes.body.small};

    h3 {
      margin-top: 0;
    }

    .btn {
      width: 100%;
      max-width: 400px;
      padding: 1.5rem 1.5rem;
    }

    @media screen and (min-width: ${(props) =>
        props.theme.breakpoints.medium}) {
      display: flex;
      flex-flow: column;
      width: 25%;
      padding-left: 1rem;

      .btn {
        width: auto;
      }
    }
  }

  .banner-callout {
    width: 100%;
    text-align: center;
    padding-top: 1rem;
    padding-bottom: 1rem;

    @media screen and (min-width: ${(props) =>
        props.theme.breakpoints.medium}) {
      padding-bottom: 0;
    }
  }

  .banner-callout__text {
    display: block;
    font-style: italic;
    margin-bottom: 1rem;
  }
`;

const ChangeChartButton = styled.button`
  display: flex !important;
  align-items: center;
  text-align: left !important;
  text-transform: capitalize !important;
  letter-spacing: 1px !important;
  margin: 1rem 0;

  &.active {
    outline: none; /* Don't display border on chrome */
    box-shadow: none;
    background-color: ${(props) => props.theme.colors.secondaryBlue};
  }

  .btn--chart-toggle--text {
    font-size: ${(props) => props.theme.typography.sizes.body.small};
  }
`;
