import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Primary from '../components/Primary';
import Banner from '../components/homepage/Banner';
import NewsFeed from '../components/homepage/NewsFeed';
import StateofData from '../components/homepage/StateofData';
import Datasets from '../data/datasets';

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
              <Banner numDeaths={meta.num_records} year={meta.lookups.year} yearData={data.records.year} />
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
