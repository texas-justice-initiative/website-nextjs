import React, { Component } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import data from '../data/cdr_compressed';
import CheckboxGroup from '../components/CheckboxGroup';
import BarChart from '../components/charts/chartsjs/BarChart';
import PieChart from '../components/charts/chartsjs/PieChart';

// Initialize data values
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

// get values to generate option list
const {
  age_at_time_of_death: ageInit,
  agency_name: agencyInit,
  death_location_county: countyInit,
  death_location_type: locTypeInit,
  manner_of_death: mannerInit,
  means_of_death: meansInit,
  race: raceInit,
  sex: sexInit,
  type_of_custody: typeOfCustodyInit,
  year: yearInit,
} = data.meta.lookups;

class Explore extends Component {
  state = {
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
    currentData: data.records,
    recordCount: data.meta.num_records,
  };

  calculateData = type => {
    // Not sure why type is undefined, or why this function is called twice ???

    if (type) {
      // return only records when the filter value isn't null
      // ##### Filter all data based on user selections

      let removalList = [];

      Object.keys(data.records).forEach(key => {
        // Iterate through each of the items in data.records
        data.records[key].filter((value, index) => {
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
      Object.keys(data.records).forEach(key => {
        // console.log(key);
        const category = data.records[key];
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
      values[data.meta.lookups[type].indexOf(value)] = value;
    }
    // console.log('VALUES: ', values);
    this.setState({ [type]: values }, () => {
      // calculate dataset after change
      this.calculateData(type);
    });
  };

  render() {
    const pageTitle = 'Explore the Data';
    const { year, race, sex, manner_of_death, currentData, recordCount } = this.state;
    return (
      <Wrapper>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <Aside>
          <form action="">
            <CheckboxGroup name="year" values={yearInit} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="race" values={raceInit} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="sex" values={sexInit} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="manner_of_death" values={mannerInit} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="type_of_custody" values={typeOfCustodyInit} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="death_location_type" values={locTypeInit} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="means_of_death" values={meansInit} handler={this.handleCheckboxChange} />
          </form>
        </Aside>
        <Main>
          <h1>{pageTitle}</h1>
          <h2>Total number of filtered incidents: {recordCount}</h2>
          <div>
            <BarChart title="Year" meta={year} metaData={currentData.year} />
            <PieChart title="Race" meta={race} metaData={currentData.race} />
            <PieChart title="Sex" meta={sex} metaData={currentData.sex} />
            <PieChart title="Manner of Death" meta={manner_of_death} metaData={currentData.manner_of_death} />
            <PieChart title="Age Group" meta={age_at_time_of_death} metaData={currentData.age_at_time_of_death} />
            <PieChart title="Type of Custody" meta={type_of_custody} metaData={currentData.type_of_custody} />
            <PieChart title="Death Location Type" meta={death_location_type} metaData={currentData.death_location_type} />
            <PieChart title="Means of Death" meta={means_of_death} metaData={currentData.means_of_death} />
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
