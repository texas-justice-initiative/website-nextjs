import React, { Component } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import data from '../data/cdr_compressed';
import CheckboxGroup from '../components/CheckboxGroup';
import ChartJSDeathsByYear from '../components/charts/chartsjs/DeathsByYear';

console.log('DATA: ', data);
// Initialize data values
const yearsInit = data.meta.lookups.year;
const racesInit = data.meta.lookups.race;
const sexesInit = data.meta.lookups.sex;
const mannerOfDeathsInit = data.meta.lookups.manner_of_death;
const typesOfCustodyInit = data.meta.lookups.type_of_custody;
const deathLocationTypesInit = data.meta.lookups.death_location_type;
const meansOfDeathsInit = data.meta.lookups.means_of_death;

class Explore extends Component {
  state = {
    years: yearsInit,
    yearData: {},
    races: racesInit,
    sexes: sexesInit,
    mannerOfDeaths: mannerOfDeathsInit,
    typesOfCustody: typesOfCustodyInit,
    deathLocationTypes: deathLocationTypesInit,
    meansOfDeaths: meansOfDeathsInit,
  };

  componentDidMount() {
    this.calculateYearData();
  }

  calculateYearData = () => {
    const { years } = this.state;
    const deaths = data.records.year;
    const filterItems = (arr, query) => arr.filter(year => year === query);
    const deathsByYearData = years.sort().map((year, index) => filterItems(deaths, index).length);
    const yearData = {
      labels: years,
      datasets: [
        {
          label: 'Deaths By Year',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: deathsByYearData,
        },
      ],
    };
    this.setState({ yearData });
  };

  handleCheckboxChange = e => {
    // Get type of checkbox
    const type = e.target.name;

    // Update state based on which category has changed
    const updateChart = chartType => {
      switch (chartType) {
        case 'year':
          this.calculateYearData();
          break;
        default:
          break;
      }
    };
    const pluralObject = {
      year: 'years',
      sex: 'sexes',
      race: 'races',
      mannerOfDeath: 'mannerOfDeaths',
      typeOfCustody: 'typesOfCustody',
      deathLocationType: 'deathLocationTypes',
      meansOfDeath: 'meansOfDeaths',
    };
    const category = pluralObject[type];
    const value = category === 'years' ? parseInt(e.target.value) : e.target.value;
    const values = [...this.state[category]];

    if (!e.target.checked) {
      if (values.includes(value)) {
        values.splice(values.indexOf(value), 1);
      }
    } else if (!values.includes(value)) {
      values.push(value);
    }
    this.setState({ [category]: values }, () => {
      // Update chart after state changes
      updateChart(type);
    });
  };

  render() {
    const pageTitle = 'Explore the Data';
    const { years, races, sexes, mannerOfDeaths, yearData } = this.state;
    return (
      <Wrapper>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <Aside>
          <form action="">
            <CheckboxGroup name="year" values={yearsInit} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="race" values={racesInit} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="sex" values={sexesInit} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="mannerOfDeath" values={mannerOfDeathsInit} handler={this.handleCheckboxChange} />
            <CheckboxGroup name="typeOfCustody" values={typesOfCustodyInit} handler={this.handleCheckboxChange} />
            <CheckboxGroup
              name="deathLocationType"
              values={deathLocationTypesInit}
              handler={this.handleCheckboxChange}
            />
            <CheckboxGroup name="meansOfDeath" values={meansOfDeathsInit} handler={this.handleCheckboxChange} />
          </form>
        </Aside>
        <Main>
          <h1>{pageTitle}</h1>
          <div>
            <ChartJSDeathsByYear title="ChartsJS - Deaths By Year" yearData={yearData} />
          </div>
          <p>Years: {years.map(year => `${year}, `)}</p>
          <p>Race: {races.map(race => `${race}, `)}</p>
          <p>Sex: {sexes.map(sex => `${sex}, `)}</p>
          <p>Manner of Death: {mannerOfDeaths.map(death => `${death}, `)}</p>
        </Main>
      </Wrapper>
    );
  }
}

export default Explore;

const Wrapper = styled.div`
  display: flex;
`;

const Aside = styled.aside`
  flex: 1;
`;

const Main = styled.main`
  flex: 3;
  padding-left: 4rem;
`;
