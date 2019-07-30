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
      loadedDatasets: {},
      error: null,
    };
  }

  /**
   * Once component has mounted, fetch our initial dataset.
   */
  componentDidMount() {
    this.fetchData('custodialDeaths');
  }

  /**
   * Check if we have already loaded the json for the selected dataset and fetch if we haven't.
   * @param {string} datasetName the slug of the dataset to fetch. Should be an id with no spaces, rather than the title.
   */
  fetchData(datasetName) {
    const { currentDataset, loadedDatasets } = this.state;
    /**
     * Is this dataset already being displayed? If so, return without doing anything.
     */
    if (currentDataset === datasetName) {
      return;
    }
    /**
     * Has the JSON for this dataset already been pulled?
     * If it has, load it from component state and update this.state.currentDataset
     */
    if (loadedDatasets[datasetName]) {
      this.setState({
        isLoading: false,
        currentDataset: datasetName,
      });
    } else {
      /**
       * If this isn't the already active datatset and we didn't find the data in state,
       * fetch it from the JSON file, load it into component state, and update the active dataset.
       */
      Datasets.forEach(dataset => {
        if (dataset.slug === datasetName) {
          fetch(dataset.url)
            .then(response => response.json())
            .then(data => {
              this.setState({
                isLoading: false,
                currentDataset: dataset.slug,
                loadedDatasets: { ...loadedDatasets, [dataset.slug]: data }, // Spread operator to ensure we append new datasets
              });
            })
            .catch(error => this.setState({ error, isLoading: false }));
        }
      });
    }
  }

  render() {
    // Destructure our state into something more readable
    const { isLoading, currentDataset, loadedDatasets } = this.state;

    /**
     * Check if we are still loading data from JSON and setup our HTML accordingly.
     * If loading is complete, display the chart, otherwise display a loading message.
     */
    let h1;
    let chart;

    if (isLoading === false) {
      const data = loadedDatasets[currentDataset];
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
    } else {
      h1 = <h1>Texas Justice Initiaitve</h1>;
      chart = <div className="chartContainer chart-loading">Loading...</div>;
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
                {Datasets.map(dataset =>
                  <ChangeChartButton key={dataset.slug} onClick={this.fetchData.bind(this, dataset.slug)}>{dataset.name}</ChangeChartButton>
                )}
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