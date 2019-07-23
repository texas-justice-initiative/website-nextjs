import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import DoughnutChart from '../charts/chartsjs/DoughnutChart';

class DataCharts extends React.Component {
  render() {
    // Load custodial deaths data
    const { data } = this.props;
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
    } = data.meta.lookups;
    const currentData = data.records;

    return (
      <React.Fragment>
        <Wrapper>
          <h2>What Our Data Shows</h2>
          <p>
            This is a sampling of the data we collect and provide for public use with our easy to use data exploration
            tools. If you want to dive deeper into the data, head to our Explore the Data page.
          </p>
          <ChartContainer>
            <DoughnutChart title="Manner of Death" meta={manner_of_death} metaData={currentData.manner_of_death} />
            <DoughnutChart title="Age Group" meta={age_at_time_of_death} metaData={currentData.age_at_time_of_death} />
            <DoughnutChart title="Type of Custody" meta={type_of_custody} metaData={currentData.type_of_custody} />
          </ChartContainer>
        </Wrapper>
      </React.Fragment>
    )
  }
}

export default DataCharts;

const Wrapper = styled.div`
  order: 3;
  width: 100%;

  h2 {
    color: ${props => props.theme.colors.black};
    padding-bottom: 5px;
    border-bottom: 3px solid ${props => props.theme.colors.black};
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
    order: 3;
  }
`;

const ChartContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: space-between;

  >div {
    max-width: 300px;
  }
`;
