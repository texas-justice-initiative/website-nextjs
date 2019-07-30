import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import Primary from '../components/Primary';
import Banner from '../components/homepage/Banner';
import TwitterFeed from '../components/homepage/TwitterFeed';
import NewsFeed from '../components/homepage/NewsFeed';
import StateofData from '../components/homepage/StateofData';
import DataCharts from '../components/homepage/DataCharts';
import Datasets from '../data/datasets';

const pageTitle = 'Home Page';

class Index extends React.Component {
  state = {
    isLoading: true,
    data: [],
    error: null,
  };

  componentDidMount() {
    // Fetch data once component has mounted
    this.fetchData(Datasets);
  }

  // Loop through our dataset array and fetch each dataset
  fetchData(datasets) {

    // Count our dataset length so we can set isLoading to false once ALL datasets have loaded
    let counter = datasets.length;
    datasets.forEach(dataset => {
      fetch(dataset.url)
        .then(response => response.json())
        .then(data => {

          // Add each dataset into state
          this.setState({
            data: [...this.state.data, data],
          });

          // Update our counter
          counter -= 1;

          // If we finish loading the last dataset, set isLoading to false
          if (counter === 0 ) {
            this.setState({
              isLoading: false,
            });
          }
        })
        .catch(error => this.setState({ error, isLoading: false }));
    });
  }

  render() {
    let meta;
    const { isLoading, data, error } = this.state;

    // If we have loaded all of our data, setup our initial chart
    if (isLoading === false) {
      const custodialDeaths = data[2];
      const { meta } = custodialDeaths;
      const { lookups } = meta;
      const {
        age_at_time_of_death,
        agency_name,
        death_location_county,
        death_location_type,
        manner_of_death,
        means_of_death,
        race,
        sex,
        type_of_custody,
        year,
      } = meta.lookups;
      console.log(meta, year, custodialDeaths);

      return (
        <React.Fragment>
          <Head>
            <title>Texas Justice Initiative | {pageTitle}</title>
          </Head>
          <Primary fullWidth="true">
            <FlexWrap>
              <Banner numDeaths={meta.num_records} year={year} yearData={custodialDeaths.records.year}></Banner>
              <TwitterFeed />
              <NewsFeed />
              <StateofData />
              <DataCharts data={custodialDeaths} />
            </FlexWrap>
          </Primary>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <Head>
            <title>Texas Justice Initiative | {pageTitle}</title>
          </Head>
          <Primary fullWidth="true">
            <FlexWrap>
              Still loading
            </FlexWrap>
          </Primary>
        </React.Fragment>
      );
    }
  }
}

export default Index;

const FlexWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
