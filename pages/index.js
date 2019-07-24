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

const pageTitle = 'Home Page';

class Index extends React.Component {
  static async getInitialProps() {
    const res = await fetch('https://s3.amazonaws.com/tji-compressed-data/cdr_compressed.json');
    const data = await res.json();
    return { data };
  }

  state = {
    age_at_time_of_death: this.props.data.meta.lookups.age_at_time_of_death,
    agency_name: this.props.data.meta.lookups.agency_name,
    death_location_county: this.props.data.meta.lookups.death_location_county,
    death_location_type: this.props.data.meta.lookups.death_location_type,
    manner_of_death: this.props.data.meta.lookups.manner_of_death,
    means_of_death: this.props.data.meta.lookups.means_of_death,
    race: this.props.data.meta.lookups.race,
    sex: this.props.data.meta.lookups.sex,
    type_of_custody: this.props.data.meta.lookups.type_of_custody,
    year: this.props.data.meta.lookups.year,
    currentData: this.props.data.records,
    recordCount: this.props.data.meta.num_records,
  };

  render() {
    const { data } = this.props;
    const { meta } = this.props.data;
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

    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <Primary fullWidth="true">
          <FlexWrap>
            <Banner numDeaths={meta.num_records} year={year} yearData={this.state.currentData.year}></Banner>
            <TwitterFeed />
            <NewsFeed />
            <StateofData />
            <DataCharts data={data} />
          </FlexWrap>
        </Primary>
      </React.Fragment>
    )
  }
}

export default Index;

const FlexWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
