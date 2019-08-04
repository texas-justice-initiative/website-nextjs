import React, { Component } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import fetch from 'isomorphic-unfetch';
import FilterPanel from '../components/FilterPanel';
import CheckboxGroup from '../components/CheckboxGroup';
import BarChart from '../components/charts/chartsjs/BarChart';
import DoughnutChart from '../components/charts/chartsjs/DoughnutChart';
import HeroContent from '../components/explore-the-data-page/HeroContent';
import DatasetButtons from '../components/explore-the-data-page/DatasetButtons';

class Explore extends Component {
  static async getInitialProps() {
    const res = await fetch('https://s3.amazonaws.com/tji-compressed-data/cdr_compressed.json');
    const data = await res.json();
    return { data };
    console.log(data);
  }

  groupAgesAtTimeOfDeath = ages => {
    // Create age group buckets 
    const agesNegativeOrNull = ages.filter(age_at_time_of_death =>
      age_at_time_of_death < 0 ||
      age_at_time_of_death === undefined || 
      age_at_time_of_death === null
    );
    const agesPositiveNotNull = ages.filter(age_at_time_of_death =>
      !agesNegativeOrNull.includes(age_at_time_of_death)
    );
    const ageGroups = {
      'Negative or Null': agesNegativeOrNull.length,
      'Under 18': 0,
      '18 to 29': 0,
      '30 to 39': 0,
      '40 to 49': 0,
      '50 to 59': 0,
      '60 to 69': 0,
      '70 to 79': 0,
      '80 to 89': 0,
      '90 to 99': 0,
      '100 and up': 0
    };
    agesPositiveNotNull.forEach(age_at_time_of_death => {
      if (age_at_time_of_death < 18) {
        ageGroups['Under 18']++;
      } else if (age_at_time_of_death >= 18 && age_at_time_of_death <= 29) {
        ageGroups['18 to 29']++;
      } else if (age_at_time_of_death >= 30 && age_at_time_of_death <= 39) {
        ageGroups['30 to 39']++;
      } else if (age_at_time_of_death >= 40 && age_at_time_of_death <= 49) {
        ageGroups['40 to 49']++;
      } else if (age_at_time_of_death >= 50 && age_at_time_of_death <= 59) {
        ageGroups['50 to 59']++;
      } else if (age_at_time_of_death >= 60 && age_at_time_of_death <= 69) {
        ageGroups['60 to 69']++;
      } else if (age_at_time_of_death >= 70 && age_at_time_of_death <= 79) {
        ageGroups['70 to 79']++;
      } else if (age_at_time_of_death >= 80 && age_at_time_of_death <= 89) {
        ageGroups['80 to 89']++;
      } else if (age_at_time_of_death >= 90 && age_at_time_of_death <= 99) {
        ageGroups['90 to 99']++;
      } else if (age_at_time_of_death >= 100) {
        ageGroups['100']++;
      }
    });
    return ageGroups;
  };

  state = {
    age_at_time_of_death: this.groupAgesAtTimeOfDeath(this.props.data.records.age_at_time_of_death),
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

  calculateData = type => {
    // Not sure why type is undefined, or why this function is called twice ???

    if (type) {
      // return only records when the filter value isn't null
      // ##### Filter all data based on user selections

      let removalList = [];

      Object.keys(this.props.data.records).forEach(key => {
        // Iterate through each of the items in data.records
        this.props.data.records[key].filter((value, index) => {
          // Filter based on the values in the user selected options
          if (this.state[key][value] !== null) return true;
          // Add to removalList if
          removalList.push(index);
          return false;
        });
      });

      // Get unique array to remove ie. get rid of duplicates
      removalList = [...new Set(removalList)];
      // console.log(removalList);

      const currentData = {};

      // Remove filtered values from all data
      Object.keys(this.props.data.records).forEach(key => {
        // console.log(key);
        const category = this.props.data.records[key];
        const filteredData = category.filter((val, index) => removalList.indexOf(index) < 0);
        currentData[key] = filteredData;
      });

      // set state to filtered data
      this.setState({ currentData });
      // console.log(currentData);
      // console.log('DATA: ', data.records);
    }
  };

  handleCheckboxChange = e => {
    this.calculateData();
    // Get type of checkbox
    const type = e.target.name;
    const value = type === 'year' ? parseInt(e.target.value) : e.target.value;
    const values = [...this.state[type]];

    if (!e.target.checked) {
      if (values.includes(value)) {
        values[values.indexOf(value)] = null;
      }
    } else if (!values.includes(value)) {
      values[this.props.data.meta.lookups[type].indexOf(value)] = value;
    }
    // console.log('VALUES: ', values);
    this.setState({ [type]: values }, () => {
      // calculate dataset after change
      this.calculateData(type);
    });
  };

  render() {
    console.log('STATE: ', this.state);
    console.log(this.groupAgesAtTimeOfDeath(this.props.data.records.age_at_time_of_death));
    const pageTitle = 'Explore the Data';
    const { meta } = this.props.data;
    const age_at_time_of_death = Object.keys(this.groupAgesAtTimeOfDeath(this.props.data.records.age_at_time_of_death));
    const {
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
        <Sidebar>
          <form action="">
            <CheckboxGroup name="year" values={year} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="race" values={race} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="sex" values={sex} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="manner_of_death" values={manner_of_death} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="age_at_time_of_death" values={age_at_time_of_death} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="type_of_custody" values={type_of_custody} handler={this.handleCheckboxChange} />
            <CheckboxGroup
              name="death_location_type"
              values={death_location_type}
              handler={this.handleCheckboxChange}
            />
            <CheckboxGroup name="means_of_death" values={means_of_death} handler={this.handleCheckboxChange} />
          </form>
        </Sidebar>
        <Main>
          <h1>{pageTitle}</h1>
          <HeroContent />
          <DatasetButtons />
          <h2 className="filtered-incidents">
            Total number of filtered incidents:{' '}
            <span className="incident-number">{meta.num_records.toLocaleString()}</span>
          </h2>
          <ChartContainer>
            <BarChart title="Year" meta={year} metaData={this.state.currentData.year} />
            <DoughnutChart title="Race" meta={race} metaData={this.state.currentData.race} />
            <DoughnutChart title="Sex" meta={sex} metaData={this.state.currentData.sex} />
            <DoughnutChart
              title="Manner of Death"
              meta={manner_of_death}
              metaData={this.state.currentData.manner_of_death}
            />
            <DoughnutChart
              title="Age Group"
              meta={age_at_time_of_death}
              metaData={this.state.currentData.age_at_time_of_death}
            />
            <DoughnutChart
              title="Type of Custody"
              meta={type_of_custody}
              metaData={this.state.currentData.type_of_custody}
            />
            <DoughnutChart
              title="Death Location Type"
              meta={death_location_type}
              metaData={this.state.currentData.death_location_type}
            />
            <DoughnutChart
              title="Means of Death"
              meta={means_of_death}
              metaData={this.state.currentData.means_of_death}
            />
          </ChartContainer>
        </Main>
      </React.Fragment>
    );
  }
}

export default Explore;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
`;

const Main = styled.main`
  padding: 1em;
  width: 100%;
  padding-left: calc(1em + 50px);
  z-index: 1;

  @media screen and (min-width: ${props => props.theme.medium}) {
    position: relative;
    padding: 2em 4rem;
    width: 75%;
  }
  .filtered-incidents {
    margin: 4rem 0;
    .incident-number {
    color: ${props => props.theme.colors.primaryRed};
  }
`;

const ChartContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;

  > div {
    margin: 0.5rem;
    padding: 1.5rem 1rem;
    background: ${props => props.theme.colors.grayLightest};
    border: 1px solid ${props => props.theme.colors.grayLight};
  }
  > div.bar-chart {
    width: 600px;
  }
  > div.doughnut-chart {
    max-width: 300px;
  }
}
`;
