import React, { Component } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import CheckboxGroup from '../components/CheckboxGroup';
import BarChart from '../components/charts/chartsjs/BarChart';
import PieChart from '../components/charts/chartsjs/PieChart';
import DeathsByDataType from '../components/charts/chartsjs/PieChart';

class Explore extends Component {
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
    const pageTitle = 'Explore the Data';
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
      <Wrapper>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <Aside>
          <form action="">
            <CheckboxGroup name="year" values={year} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="race" values={race} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="sex" values={sex} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="manner_of_death" values={manner_of_death} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="type_of_custody" values={type_of_custody} handler={this.handleCheckboxChange} />
            <CheckboxGroup
              name="death_location_type"
              values={death_location_type}
              handler={this.handleCheckboxChange}
            />
            <CheckboxGroup name="means_of_death" values={means_of_death} handler={this.handleCheckboxChange} />
          </form>
        </Aside>
        <Main>
          <h1>{pageTitle}</h1>
          <h2>Total number of filtered incidents: {meta.num_records.toLocaleString()}</h2>
          <div>
            <BarChart title="Year" meta={year} metaData={this.state.currentData.year} />
            <PieChart title="Race" meta={race} metaData={this.state.currentData.race} />
            <PieChart title="Sex" meta={sex} metaData={this.state.currentData.sex} />
            <PieChart
              title="Manner of Death"
              meta={manner_of_death}
              metaData={this.state.currentData.manner_of_death}
            />
            <PieChart
              title="Age Group"
              meta={age_at_time_of_death}
              metaData={this.state.currentData.age_at_time_of_death}
            />
            <PieChart
              title="Type of Custody"
              meta={type_of_custody}
              metaData={this.state.currentData.type_of_custody}
            />
            <PieChart
              title="Death Location Type"
              meta={death_location_type}
              metaData={this.state.currentData.death_location_type}
            />
            <PieChart title="Means of Death" meta={means_of_death} metaData={this.state.currentData.means_of_death} />
          </div>
        </Main>
      </Wrapper>
    );
  }
}

export default Explore;

const Wrapper = styled.div`
  display: flex;
  h2 {
    margin: 2rem 0;
  }
`;

const Aside = styled.aside`
  flex: 1;
`;

const Main = styled.main`
  flex: 3;
  padding-left: 4rem;
`;
