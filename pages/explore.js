import React, { Component } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import datasets from '../data/datasets_test';
import HeroContent from '../components/explore-the-data-page/HeroContent';
import FilterPanel from '../components/FilterPanel';
import CheckboxGroup from '../components/CheckboxGroup';

/*
const datasets = [
  'https://api.myjson.com/bins/v7ajb',
  'https://api.myjson.com/bins/uwkqf',
  'https://api.myjson.com/bins/19bhaf',
];
*/

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activeDataset: '',
      data: {},
      filters: {},
    }

    this.updateFilters = this.updateFilters.bind(this);
  }

  componentDidMount() {
    const { data, datasetNames } = this.props;
    // In order to setup our filters object, we need to get each lookup, along with all options for that lookup.
    // We can then create our filter object with all filters turned off by default
    const lookups = Object.keys(data.records);

    const filters = {};
    lookups.forEach(lookup => {
      filters[lookup] = Object.create(null, {});
      const lookupOptions = [...new Set(data.records[lookup])];
      lookupOptions.forEach(option => (filters[lookup][option] = true));
    });

    this.setState({
      isLoading: false,
      activeDataset: datasetNames[0],
      data,
      filters,
    })
  }

  /**
   * Updates state whenever a filter is changed
   */
  updateFilters = (event) => {
    const { target } = event;
    const group = target.name;
    const option = group === 'year' ? parseInt(target.value) : target.value;
    const isChecked = target.checked;

    // activeDataset.data.records = filteredRecords;
    const { filters } = { ...this.state };
    filters[group][option] = isChecked;
    this.setState({
      filters,
    });

    /*
    const lookupGroup = activeDataset.data.meta.lookups[group];
    const lookupIndex = lookupGroup.indexOf(value);
    const selectedRecords = activeDataset.data.records[group];
    const filteredRecords = activeDataset.data.records;

    //console.log(`Group: ${group}; Value: ${value}; LookupIndex: ${lookupIndex};`);
    //console.log('Looking in: ', selectedRecords);

    // Reduce the selected groups records down to those that match our filter, saving the index of those records
    const matchedRecords = selectedRecords.reduce((acc, curr, index) => {
      if (curr === lookupIndex || curr === null) {
        acc.push(index);
      }
      return acc;
    }, []);
    //console.log('Matched Records: ', matchedRecords);

    */
  };

  applyFilters(data, filters) {
    // Create an empty object which will become our final data object to be returned
    let filteredData = {};
    // Create an empty array which will contain the indices of all records to be filtered
    let filterIndices = []

    //Loop through our filters
    const filterGroups = Object.keys(filters);
    filterGroups.forEach(filterGroup => {
      const groupOptions = Object.keys(filters[filterGroup]);

      groupOptions.forEach(groupOption => {
        if (filters[filterGroup][groupOption] === false) {
          const currentRecords = data.records[filterGroup];

          // Reduce the selected groups records down to those that match our filter, saving the index of those records
          const matchedRecords = currentRecords.reduce((acc, curr, index) => {
            if (curr === groupOption) {
              acc.push(index);
            }
            return acc;
          }, []);
          filterIndices = filterIndices.concat(matchedRecords);
        }
      })
    })
    //Filter data for options set to "true"

    //Create an array of index values that match each filter

    // Remove all records with matching index values

    // return a filtered data object which will get sent to Charts.js
  }

  /**
   * Check if we have already loaded the json for the selected dataset and fetch if we haven't.
   * @param {string} datasetName the slug of the dataset to fetch. Should be an id with no spaces, rather than the title.
   */
  async fetchData(datasetName) {
    // Fetch the json for the first dataset
    const res = await fetch(datasets[datasetName].urls.compressed);
    const data = await res.json();

    // In order to setup our filters object, we need to get each lookup, along with all options for that lookup.
    // We can then create our filter object with all filters turned off by default
    const lookups = Object.keys(data.records);

    const filters = {};
    lookups.forEach(lookup => {
      filters[lookup] = Object.create(null, {});
      const lookupOptions = [...new Set(data.records[lookup])];
      lookupOptions.forEach(option => (filters[lookup][option] = true));
    });
    await this.setState({
      activeDataset: datasetName,
      data,
      filters,
    })
  }

  render() {
    const pageTitle = 'Explore The Data';
    const { isLoading, activeDataset, filters } = this.state;
    const datasetNames = Object.keys(datasets);

    // Render our charts if component is finished loading data
    if (!isLoading) {
      const { data } = this.state;
      const chartConfigs = datasets[activeDataset].chart_configs;

      // Setup our lookups
      const lookups = Object.keys(data.records);
      let lookupOptions = {};
      lookups.forEach(lookup => (lookupOptions[lookup] = [...new Set(data.records[lookup])]));

      // Filter our data
      const filteredData = this.applyFilters(data, filters);
      // Prep data to send to Charts.js

      return (
        <React.Fragment>
          <Head>
            <title>Texas Justice Initiative | {pageTitle}</title>
          </Head>
          <FilterPanel>
            <form action="">
              {Object.keys(chartConfigs).map(chartConfig => (
                <CheckboxGroup
                  key={chartConfigs[chartConfig].group_by}
                  name={chartConfigs[chartConfig].group_by}
                  values={lookupOptions[chartConfigs[chartConfig].group_by]}
                  handler={this.updateFilters}
                  isChecked={filters}
                />
              ))};
            </form>
          </FilterPanel>
          <Main>
            <h1>{pageTitle}</h1>
            <HeroContent />
            <ButtonsContainer>
              {datasetNames.map(datasetName => (
                <ChangeChartButton
                  key={datasetName}
                  onClick={this.fetchData.bind(this, datasetName)}
                  className={
                    datasetName === activeDataset
                      ? 'btn btn--primary btn--chart-toggle active'
                      : 'btn btn--primary btn--chart-toggle'
                  }
                >
                  <span className="btn--chart-toggle--icon">
                    <img src={require('../images/' + datasets[datasetName].icon)} alt={datasets[datasetName].name} />
                  </span>
                  <span className="btn--chart-toggle--text">{datasets[datasetName].name}</span>
                </ChangeChartButton>
              ))}
            </ButtonsContainer>
            {lookups.map(lookup => (
              <ul key={lookup}>
                <li>{lookup}</li>
                {lookupOptions[lookup].map(el => (
                  <li key={el}>{el}</li>
                ))}
              </ul>
            ))}
          </Main>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <FilterPanel />
        <Main>
          <h1>{pageTitle}</h1>
          <HeroContent />
          <ButtonsContainer>
            {datasetNames.map(datasetName => (
              <ChangeChartButton
                key={datasetName}
                onClick={this.fetchData.bind(this, datasetName)}
                className={
                  datasetName === activeDataset
                    ? 'btn btn--primary btn--chart-toggle active'
                    : 'btn btn--primary btn--chart-toggle'
                }
              >
                <span className="btn--chart-toggle--icon">
                  <img src={require('../images/' + datasets[datasetName].icon)} alt={datasets[datasetName].name} />
                </span>
                <span className="btn--chart-toggle--text">{datasets[datasetName].name}</span>
              </ChangeChartButton>
            ))}
          </ButtonsContainer>
          Loading...
        </Main>
      </React.Fragment>
    )
  }
}

Explore.getInitialProps = async function() {
  // Setup an array to get the property name of each dataset
  const datasetNames = Object.keys(datasets);
  // Fetch the json for the first dataset
  const res = await fetch(datasets[datasetNames[0]].urls.compressed);
  const data = await res.json();
  return { datasetNames, data };
};

export default Explore;

const Main = styled.main`
  padding: 1em;
  width: 100%;
  padding-left: calc(1em + 50px);
  z-index: 1;
  @media screen and (min-width: ${props => props.theme.medium}) {
    position: relative;
    padding: 2em 4rem;
    width: calc(100% - 300px);
    flex-grow: 1;
  }
  .filtered-incidents {
    margin: 4rem 0;
    .incident-number {
    color: ${props => props.theme.colors.primaryRed};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;

  .btn--chart-toggle {
    margin-right: 1rem;
  }
`;

const ChangeChartButton = styled.button`
  display: flex !important;
  align-items: center;
  text-align: left !important;
  text-transform: capitalize !important;
  letter-spacing: 1px !important;
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

/*

    if (isLoading) {
      return (
        <React.Fragment>
          <Head>
            <title>Texas Justice Initiative | {pageTitle}</title>
          </Head>
          <FilterPanel />
          <Main>
            <h1>{pageTitle}</h1>
            <HeroContent />
            <ButtonsContainer>
              {DatasetNames.map(datasetName => (
                <React.Fragment key={datasetName}>
                  <ChangeChartButton
                    onClick={this.fetchData.bind(this, datasetName)}
                    className={
                      datasetName === currentDataset.name
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
              ))}
            </ButtonsContainer>
            Loading...
          </Main>
        </React.Fragment>        
      )
    }
    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <FilterPanel>
          <form action="">
            {Object.keys(chartConfigs).map(chartConfig => (
              <CheckboxGroup
                name={chartConfigs[chartConfig].group_by}
                values={lookups[chartConfigs[chartConfig].group_by]}
              >
                {lookups[chartConfigs[chartConfig].group_by].map(value => (
                  <div>
                    <input
                      onChange={this.updateFilters}
                      type="checkbox"
                      name={value}
                      id={value}
                      value={value}
                      data-group={chartConfigs[chartConfig].group_by}
                      defaultChecked="checked"
                    />
                    <label htmlFor={value}>{value}</label>
                  </div>
                ))}
              </CheckboxGroup>
            ))};
          </form>
        </FilterPanel>
        <Main>
          <h1>{pageTitle}</h1>
          <HeroContent />
          <ButtonsContainer>
            {DatasetNames.map(datasetName => (
              <React.Fragment key={datasetName}>
                <ChangeChartButton
                  onClick={this.fetchData.bind(this, datasetName)}
                  className={
                    datasetName === currentDataset.name
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
            ))}
          </ButtonsContainer>
          <div className="filtered-incidents">{datasetHeading}</div>
          <ChartContainer>
            {Object.keys(chartConfigs).map(chartConfig => (
              <div className="chart chart-container">
                <h3 className="chart__group--label">{chartConfigs[chartConfig].group_by.replace(/_/g, ' ')}</h3>
                {chartConfigs[chartConfig].type === 'bar' ? (
                  <BarChart
                    name={chartConfigs[chartConfig].group_by}
                    title=""
                    meta={lookups[chartConfigs[chartConfig].group_by]}
                    metaData={data.records[chartConfigs[chartConfig].group_by]}
                  />
                ) : (
                  <DoughnutChart
                    name={chartConfigs[chartConfig].group_by}
                    title=""
                    meta={lookups[chartConfigs[chartConfig].group_by]} 
                    metaData={data.records[chartConfigs[chartConfig].group_by]}
                  />
                )}
              </div>
            ))};
          </ChartContainer>
        </Main>
      </React.Fragment>
    );
    */