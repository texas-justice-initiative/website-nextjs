import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Primary from '../components/Primary';
import NewsFeed from '../components/homepage/NewsFeed';
import StateofData from '../components/homepage/StateofData';
import Datasets from '../data/datasets';
import BarChart from '../components/charts/chartsjs/BarChart';

const pageTitle = 'Home Page';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      currentDataset: '',
      data: {},
      error: null,
    };

    this.changeChart = this.changeChart.bind(this);
  }

  componentDidMount() {
    this.fetchData('custodialDeaths');
  }

  fetchData(datasetName) {
    Datasets.forEach(dataset => {
      if (dataset.slug === datasetName) {
        fetch(dataset.url)
          .then(response => response.json())
          .then(data => {
            this.setState({
              isLoading: false,
              currentDataset: dataset.name,
              data,
            });
          })
          .catch(error => this.setState({ error, isLoading: false }));
      }
    });
  }

  changeChart(chartName) {
    this.fetchData(chartName);
  }

  render() {
    const { isLoading, error, currentDataset, data } = this.state;
    let h1;
    let chart;

    h1 = <h1>Texas Justice Initiaitve</h1>;
    chart = <div className="chartContainer chart-loading">Loading...</div>;

    // Setup our chart area and data once our data has loaded
    if (isLoading === false) {
      const { meta } = data;
      const { lookups } = meta;

      h1 = (
        <h1>
          Since 2005, <span className="text--red">{meta.num_records.toLocaleString()}</span> deaths have been reported
          in Texas Custody.
        </h1>
      );

      chart = (
        <div className="chartContainer">
          <BarChart title="" meta={lookups.year} metaData={data.records.year} />
          <div className="bar-chart__title">Deaths in Custody Since 2005</div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <Primary fullWidth="true">
          <FlexWrap>
            <Banner>
              <div className="banner-left">
                {h1}
                <div className="bar-chart bar-chart--container">{chart}</div>
              </div>
              <div className="banner-right">
                <ChangeChartButton>Custodial Deaths</ChangeChartButton>
                <ChangeChartButton>Civilians Shot by Officers</ChangeChartButton>
                <ChangeChartButton>Officers Shot by Civilians</ChangeChartButton>
              </div>
            </Banner>
            <NewsFeed />
            <StateofData />
          </FlexWrap>
        </Primary>
      </React.Fragment>
    );
  }
}

export default Index;

const FlexWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const Banner = styled.div`
  order: 0;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  background: ${props => props.theme.colors.grayLightest};
  padding: 2rem;

  @media screen and (min-width: ${props => props.theme.medium}) {
    align-items: stretch;
  }

  .banner-left {
    width: 100%;

    @media screen and (min-width: ${props => props.theme.medium}) {
      width: 75%;
      padding-right: 2rem;
    }

    h1 {
      color: ${props => props.theme.colors.black};
      border-bottom-width: 0;
    }

    .bar-chart--container {
      width: 100%;
      height: auto;

      .bar-chart__title {
        text-align: center;
      }
    }
  }

  .banner-right {
    width: 100%;
    font-size: ${props => props.theme.sidebarFont__size};
    line-height: 1.25;

    @media screen and (min-width: ${props => props.theme.medium}) {
      display: flex;
      flex-flow: column;
      width: 25%;
      padding: 1rem 0 1rem 2rem;
      border-left: 1px solid ${props => props.theme.colors.black};
    }
  }
`;

const ChangeChartButton = styled.button`

`;