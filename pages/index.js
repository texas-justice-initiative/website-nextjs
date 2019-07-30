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
  state = {
    isLoading: true,
    currentDataset: '',
    data: {},
    error: null,
  };

  componentDidMount() {
    // Fetch data once component has mounted
    this.fetchData('custodialDeaths');
  }

  fetchData(datasetName) {
    console.log(datasetName);
    Datasets.forEach(dataset => {
      console.log(dataset);
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

  /**
   * Fetches all of our datasets and adds them to component state
   * @param {obj} datasets the array of datasets we want to load
   */
  /*
  fetchData(datasets) {
    // Count our dataset length so we can set isLoading to false once ALL datasets have loaded
    let counter = datasets.length;
    datasets.forEach(dataset => {
      fetch(dataset.url)
        .then(response => response.json())
        .then(data => {
          // Add each dataset into state
          this.setState({
            datasets: [...this.state.datasets, dataset.slug],
            data: [...this.state.data, data],
          });

          // Update our counter
          counter -= 1;

          // If we finish loading the last dataset, set isLoading to false
          if (counter === 0) {
            this.setState({
              isLoading: false,
            });
          }
        })
        .catch(error => this.setState({ error, isLoading: false }));
    });
  }
  */
  render() {
    const { isLoading, error } = this.state;

    // If we have loaded all of our data, setup our initial chart
    if (isLoading === false) {
      const { currentDataset, data } = this.state;
      const { meta } = data;
      const { lookups } = meta;

      return (
        <React.Fragment>
          <Head>
            <title>Texas Justice Initiative | {pageTitle}</title>
          </Head>
          <Primary fullWidth="true">
            <FlexWrap>
              <Banner>
                <div className="banner-left">
                  <h1>
                    Since 2005, <span className="text--red">{meta.num_records.toLocaleString()}</span> deaths have been reported in
                    Texas Custody.
                  </h1>
                  <div className="bar-chart bar-chart--container">
                    <BarChart title="" meta={meta.lookups.year} metaData={data.records.year} />
                    <div className="bar-chart__title">Deaths in Custody Since 2005</div>
                  </div>
                </div>
                <div className="banner-right">
                  <ChartChange>Custodial Deaths</ChartChange>
                  <ChartChange>Civilians Shot by Officers</ChartChange>
                  <ChartChange>Officers Shot by Civilians</ChartChange>
                </div>
              </Banner>
              <NewsFeed />
              <StateofData />
            </FlexWrap>
          </Primary>
        </React.Fragment>
      );
    }

    // Return loading screen
    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <Primary fullWidth="true">Loading...</Primary>
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

const ChartChange = styled.button`

`;