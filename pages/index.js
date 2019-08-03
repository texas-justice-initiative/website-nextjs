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
      chartTitle: '',
      datasetDescription: '',
      loadedDatasets: {},
      totalIncidents: '',
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
    const selectedDataset = Datasets[datasetName];

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
        chartTitle: loadedDatasets[datasetName].title,
        datasetDescription: loadedDatasets[datasetName].description,
        totalIncidents: loadedDatasets[datasetName].data.meta.num_records,
      });
    } else {
      /**
       * If this isn't the already active datatset and we didn't find the data in state,
       * fetch it from the JSON file, load it into component state, and update the active dataset.
       */
      fetch(selectedDataset.url)
        .then(response => response.json())
        .then(data => {
          /**
           * This will set the initial state for when a new dataset loads (i.e. on page load or button click)
           * Start here when modifying how objects are stored in state to be referenced later.
           */
          this.setState({
            isLoading: false,
            currentDataset: datasetName,
            chartTitle: selectedDataset.chartTitle,
            datasetDescription: selectedDataset.description,
            loadedDatasets: {
              ...loadedDatasets, // Spread operator to ensure we append new datasets
              [datasetName]: {
                name: selectedDataset.name, // dataset.props are loaded from /data/dataset.js
                title: selectedDataset.chartTitle,
                description: selectedDataset.description,
                data, // Loaded from json stored on AWS
              },
            },
            totalIncidents: data.meta.num_records.toLocaleString(),
          });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }
  }

  render() {
    // Destructure our state into something more readable
    const { isLoading, currentDataset, chartTitle, datasetDescription, loadedDatasets, totalIncidents } = this.state;
    const DatasetNames = Object.keys(Datasets);
    /**
     * Check if we are still loading data from JSON and setup our HTML accordingly.
     * If loading is complete, display the chart, otherwise display a loading message.
     */
    let h1;
    let chart;

    switch (currentDataset) {
      case 'custodialDeaths':
        h1 = (
          <h1>
            Since 2005, <span className="text--red">{totalIncidents}</span> deaths have been reported
            in Texas Custody.
          </h1>
        );
        break;
      case 'civiliansShot':
        h1 = (
          <h1>
            Texas law enforcement officers have shot <span className="text--red">{totalIncidents} civilians</span> since 2015.
          </h1>
        );
        break;
      case 'officersShot':
        h1 = (
          <h1>
            There have been <span className="text--red">{totalIncidents} Texas law enforcement officers</span> shot since 2015.
          </h1>
        );
        break;
      default:
        h1 = <h1>Texas Justice Initiative...loading Custodial Deaths data</h1>;
        break;
    }

    if (isLoading === false) {
      const { data } = loadedDatasets[currentDataset];
      const { meta } = data;
      const { lookups } = meta;

      chart = (
        <div className="chartContainer">
          <BarChart title="" meta={lookups.year} metaData={data.records.year} />
          <div className="bar-chart__title">{chartTitle}</div>
        </div>
      );
    } else {
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
              <div className="banner-wrapper">
                <div className="banner-left">
                  <div className="bar-chart bar-chart--container">{chart}</div>
                </div>
                <div className="banner-right">
                  {DatasetNames.map(datasetName =>
                    <React.Fragment key={datasetName}>
                      <ChangeChartButton
                        onClick={this.fetchData.bind(this, datasetName)}
                        className={
                          datasetName === currentDataset
                            ? 'btn btn--primary btn--chart-toggle active'
                            : 'btn btn--primary btn--chart-toggle'
                        }
                      >
                        <span className="btn--chart-toggle--icon">
                          <img src={require('../images/' + Datasets[datasetName].icon)} alt={Datasets[datasetName].name} />
                        </span>
                        <span className="btn--chart-toggle--text">{Datasets[datasetName].name}</span>
                      </ChangeChartButton>
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div className="banner-callout">
                <span className="banner-callout__text">Want to learn more?</span>
                <a href="/data" className="btn btn--primary">Explore the Data</a>
              </div>
            </Banner>
            <div className="divider--large divider--blue"></div>
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
  width: 100%;

  @media screen and (min-width: ${props => props.theme.medium}) {
    padding: 2rem 0;
  }

  .banner-heading {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    
    @media screen and (min-width: ${props => props.theme.medium}) {
      padding-bottom: 3rem;
    }

    h1 {
      text-align: center;
      color: ${props => props.theme.colors.black};
      font-weight: 400;
      border-bottom-width: 0;

      @media screen and (max-width: ${props => props.theme.medium}) {
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
    

    @media screen and (min-width: ${props => props.theme.medium}) {
      background: ${props => props.theme.colors.grayLightest};
      padding: 3rem;
      align-items: stretch;
    }
  }

  .banner-left {
    width: 100%;
    margin-bottom: 4rem;

    @media screen and (min-width: ${props => props.theme.medium}) {
      width: 75%;
      padding-right: 2rem;
      margin-bottom: 0;
    }

    .bar-chart--container {
      width: 100%;
      height: 100%;
      background: ${props => props.theme.colors.grayLightest};
      box-shadow: 1px 1px 3px rgba(64, 64, 64, 0.5);
      padding: 0;
      padding-bottom: 1rem;

      @media screen and (min-width: ${props => props.theme.medium}) {
        background: ${props => props.theme.colors.white};
        padding: 1rem;
      }

      .bar-chart__title {
        text-align: center;
      }
    }
  }

  .banner-right {
    width: 100%;
    font-size: ${props => props.theme.sidebarFont__size};

    h3 {
      margin-top: 0;
    }

    .btn {
      width: 100%;
      max-width: 400px;
      padding: 0.5rem 1.5rem;
    }

    @media screen and (min-width: ${props => props.theme.medium}) {
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

    @media screen and (min-width: ${props => props.theme.medium}) {
      padding-top: 5rem;
      padding-bottom: 0;
    }
  }

  .banner-callout__text {
    display: block;
    font-weight: 800;
    margin-bottom: 1rem;
  }
`;

const ChangeChartButton = styled.button`
  display: flex !important;
  align-items: center;
  text-align: left !important;
  text-transform: capitalize !important;
  letter-spacing: 1px  !important;
  margin: 1rem 0;

  &.active {
    outline: none; /* Don't display border on chrome */
    box-shadow: none;
    background-color: ${props => props.theme.colors.secondaryBlue};
  }

  .btn--chart-toggle--icon {
    margin-right: 1rem;

    img {
      width: 30px;
      height: 30px;
    }
  }

  .btn--chart-toggle--text {
    font-size: ${props => props.theme.sidebarFont__size};
  }
`;