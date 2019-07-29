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
    const custodialDeaths = await res.json();
    return { custodialDeaths };
  }

  state = {
    custodialDeaths: {
      age_at_time_of_death: this.props.custodialDeaths.meta.lookups.age_at_time_of_death,
      agency_name: this.props.custodialDeaths.meta.lookups.agency_name,
      death_location_county: this.props.custodialDeaths.meta.lookups.death_location_county,
      death_location_type: this.props.custodialDeaths.meta.lookups.death_location_type,
      manner_of_death: this.props.custodialDeaths.meta.lookups.manner_of_death,
      means_of_death: this.props.custodialDeaths.meta.lookups.means_of_death,
      race: this.props.custodialDeaths.meta.lookups.race,
      sex: this.props.custodialDeaths.meta.lookups.sex,
      type_of_custody: this.props.custodialDeaths.meta.lookups.type_of_custody,
      year: this.props.custodialDeaths.meta.lookups.year,
      currentData: this.props.custodialDeaths.records,
      recordCount: this.props.custodialDeaths.meta.num_records,
    }
  };

  render() {
    const { custodialDeaths } = this.props;
    const { meta } = this.props.custodialDeaths;
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
            <Banner numDeaths={meta.num_records} year={year} yearData={this.state.custodialDeaths.currentData.year}></Banner>
            <TwitterFeed />
            <NewsFeed />
            <StateofData />
            <DataCharts data={custodialDeaths} />
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
