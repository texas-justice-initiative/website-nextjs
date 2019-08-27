import React, { Component } from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import datasets from '../data/datasets_test';
import HeroContent from '../components/explore-the-data-page/HeroContent';
import FilterPanel from '../components/explore-the-data-page/FilterPanel';
import BarChart from '../components/charts/chartsjs/BarChart';
import DoughnutChart from '../components/charts/chartsjs/DoughnutChart';

export default class Explore extends React.Component {
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
  };

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
      const lookupOptions = {};
      lookups.forEach(lookup => (lookupOptions[lookup] = [...new Set(data.records[lookup])]));

      // Filter our data, which will then be sent to Charts.js
      const totalIncidents = data.records[lookups[0]].length;
      const filteredData = filterData(data, filters);

      let datasetHeading = '';

      switch (activeDataset) {
        case 'custodialDeaths':
          datasetHeading = (
            <h2>
              Since 2005, <span className="text--red">{totalIncidents.toLocaleString()}</span> deaths have been reported in Texas Custody.
            </h2>
          );
          break;
        case 'civiliansShot':
          datasetHeading = (
            <h2>
              Texas law enforcement officers have shot <span className="text--red">{totalIncidents.toLocaleString()} civilians</span> since
              2015.
            </h2>
          );
          break;
        case 'officersShot':
          datasetHeading = (
            <h2>
              There have been <span className="text--red">{totalIncidents.toLocaleString()} Texas law enforcement officers</span> shot
              since 2015.
            </h2>
          );
          break;
        default:
          datasetHeading = (
            <h2>
              Since 2005, <span className="text--red">{totalIncidents.toLocaleString()}</span> deaths have been reported in Texas Custody.
            </h2>
          );
          break;
      }

      return (
        <React.Fragment>
          <Head>
            <title>Texas Justice Initiative | {pageTitle}</title>
          </Head>
          <FilterPanel
            dataLoaded
            chartConfigs={chartConfigs}
            handler={this.updateFilters}
            lookupOptions={lookupOptions}
            isChecked={filters}
          />
          <Main>
            <h1>{pageTitle}</h1>
            <HeroContent />
            <ButtonsContainer>
              {datasetNames.map(datasetName => (
                <ChangeChartButton
                  key={datasetName}
                  onClick={() => this.fetchData(datasetName)}
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
            <div className="filtered-incidents">{datasetHeading}</div>
            <ChartContainer>
              {Object.keys(chartConfigs).map(chartConfig => (
                <div key={chartConfigs[chartConfig].group_by} className="chart">
                  <h3 className="chart__group--label">{chartConfigs[chartConfig].group_by.replace(/_/g, ' ')}</h3>
                  {chartConfigs[chartConfig].type === 'bar' ? (
                    <BarChart
                      name={chartConfigs[chartConfig].group_by}
                      title=""
                      meta={lookupOptions[chartConfigs[chartConfig].group_by]}
                      metaData={filteredData.records[chartConfigs[chartConfig].group_by]}
                    />
                  ) : (
                    <DoughnutChart
                      name={chartConfigs[chartConfig].group_by}
                      title=""
                      meta={lookupOptions[chartConfigs[chartConfig].group_by]} 
                      metaData={filteredData.records[chartConfigs[chartConfig].group_by]}
                    />
                  )}
                </div>
              ))};
            </ChartContainer>
          </Main>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <FilterPanel
          dataLoaded={false}
          chartConfigs={null}
          handler={this.updateFilters}
          lookupOptions={null}
          isChecked={null}
        />
        <Main>
          <h1>{pageTitle}</h1>
          <HeroContent />
          <ButtonsContainer>
            {datasetNames.map(datasetName => (
              <ChangeChartButton
                key={datasetName}
                onClick={() => this.fetchData(datasetName)}
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
    );
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

/**
 * Helper function that takes in the currently loaded data and the filters object and returns a new
 * data objected that has been filtered.
 * @param {obj} data // Coming from state.data
 * @param {obj} filters // Coming from state.filters
 */
function filterData(data, filters) {
  const { records } = data;
  // Create an empty object which will become our final data object to be returned
  const filteredData = {
    records: {}
  };
  // Create an empty array which will contain the indices of all records to be filtered
  let filterIndices = []

  // Loop through our filters
  const filterGroups = Object.keys(filters);
  filterGroups.forEach(filterGroup => {

    // Add to our filtered data records which will we reduce later
    // This is important to ensure we aren't accidently modifying our object in state
    filteredData.records[filterGroup] = [...records[filterGroup]];

    // Loop through all different value options for each group
    const groupOptions = Object.keys(filters[filterGroup]);

    groupOptions.forEach(groupOption => {
      if (filters[filterGroup][groupOption] === false) {

        // Reduce the selected groups records down to those that match our filter, saving the index of those records
        const matchedRecords = filteredData.records[filterGroup].reduce((acc, curr, index) => {
          if (curr == groupOption) {
            acc.push(index);
          }
          return acc;
        }, []);
        filterIndices = filterIndices.concat(matchedRecords);
      }
    });
  });

  // At this point we have stored the index values of all records to be filtered in the array filterIndices
  // Now we want to remove those records and return a filtered dataset.
  const cleanedData = {
    records: {}
  };
  const uniqueFilters = [...new Set(filterIndices)];

  // Only process data further if we have any filters to apply, otherwise just return the original object.
  if (uniqueFilters.length > 0) {
    // Loop through groups first so that we can remove nulls more easily
    filterGroups.forEach(filterGroup => {
      uniqueFilters.forEach(index => {
        filteredData.records[filterGroup][index] = null;
      });
      cleanedData.records[filterGroup] = filteredData.records[filterGroup].filter(value => value != null);
    });
    return cleanedData;
  }
  return filteredData;
}

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

const ChartContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  div {
    margin: 0.5rem;
    padding: 1.5rem 1rem;
    background: ${props => props.theme.colors.grayLightest};
    border: 1px solid ${props => props.theme.colors.grayLight};
  }
  div.bar-chart {
    width: 600px;
  }
  div.doughnut-chart {
    max-width: 300px;
  }
  .chart__group--label {
    text-transform: uppercase;
    font-size: 1.5rem;
    text-align: center;
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