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
              <div className="banner-heading">{h1}</div>
              <div className="banner-left">
                <div className="bar-chart bar-chart--container">{chart}</div>
              </div>
              <div className="banner-right">
                <h3>Select a Dataset:</h3>
                {Datasets.map(dataset =>
                  <ChangeChartButton
                    key={dataset.slug}
                    onClick={this.fetchData.bind(this, dataset.slug)}
                    className={
                      dataset.slug === currentDataset
                        ? 'btn btn--primary btn--chart-toggle active'
                        : 'btn btn--primary btn--chart-toggle'
                    }
                  >
                    <span className="btn--chart-toggle--icon">
                      <img src={require('../images/' + dataset.icon)} alt={dataset.name} />
                    </span>
                    <span className="btn--chart-toggle--text">{dataset.name}</span>
                  </ChangeChartButton>
                )}
                <p>
                  <span class="text--blue">Texas Justice Initiative</span> is a 501 (c)(3) nonprofit organization that collects, analyzes, publishes and
                  provides oversight for criminal justice data throughout Texas.
                </p>
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
  padding: 2rem;

  @media screen and (min-width: ${props => props.theme.medium}) {
    align-items: stretch;
  }

  .banner-heading {
    width: 100%;

    @media screen and (min-width: ${props => props.theme.medium}) {
      width: 75%;
      padding-right: 2rem;
    }

    h1 {
      text-align: center;
      color: ${props => props.theme.colors.black};
      border-bottom-width: 0;
    }
  }

  .banner-left {
    width: 100%;

    @media screen and (min-width: ${props => props.theme.medium}) {
      width: 75%;
      padding-right: 2rem;
    }

    .bar-chart--container {
      width: 100%;
      height: auto;
      background: ${props => props.theme.colors.grayLightest};
      box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
      padding: 1rem;

      .bar-chart__title {
        text-align: center;
      }
    }
  }

  .banner-right {
    width: 100%;
    font-size: ${props => props.theme.sidebarFont__size};

    @media screen and (min-width: ${props => props.theme.medium}) {
      display: flex;
      flex-flow: column;
      width: 25%;
      padding: 1rem 0 1rem 2rem;
    }
  }
`;

const ChangeChartButton = styled.button`
  display: flex;
  align-items: center;
  text-align: left;
  text-transform: capitalize !important;
  letter-spacing: 1px;
  margin: 1rem;

  &.active {
    box-shadow: -1px -1px 0px rgba(64, 64, 64, 0.5);
    background-color: ${props => props.theme.colors.secondaryBlue};
  }

  .btn--chart-toggle--icon {
    img {
      width: 30px;
      height: 30px;
    }
  }

  .btn--chart-toggle--text {
    font-size: ${props => props.theme.sidebarFont__size};
  }
`;