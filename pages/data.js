/* eslint-disable guard-for-in, no-restricted-syntax, no-use-before-define */

import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import ReactTooltip from 'react-tooltip';
import Papa from 'papaparse';
import datasets from '../data/datasets';
import Layout from '../components/Layout';
import HeroContent from '../components/explore-the-data-page/HeroContent';
import FilterPanel from '../components/explore-the-data-page/FilterPanel';
import BarChart from '../components/charts/chartsjs/BarChart';
import DoughnutChart from '../components/charts/chartsjs/DoughnutChart';
import ChartNote from '../components/charts/chartsjs/ChartNote';
import DatasetDetails from '../components/explore-the-data-page/DatasetDetails';
import filterData from '../functions/filter_data';
import theme from '../theme';

export default class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activeDataset: '',
      data: {},
      filters: {},
    };

    this.updateFilters = this.updateFilters.bind(this);
    this.updateFilterGroup = this.updateFilterGroup.bind(this);
  }

  componentDidMount() {
    const datasetNames = Object.keys(datasets);
    this.fetchData(datasetNames[0]);
  }

  /**
   * Updates state whenever a filter is changed
   */
  updateFilters = event => {
    const { target } = event;
    const group = target.name;
    const key = group === 'year' ? parseInt(target.value) : target.value;
    const isChecked = target.checked;

    const { filters } = { ...this.state };
    filters[group][key] = isChecked;
    this.setState({
      filters,
    });
  };

  handleAutocompleteSelection = event => {
    const { target } = event;
    const group = target.name;
    const key = target.value;
    const { filters } = { ...this.state };
    const allGroupFiltersAreChecked = !Object.values(filters[group]).includes(false);

    if (allGroupFiltersAreChecked) {
      Object.keys(filters[group]).forEach(groupKey => {
        filters[group][groupKey] = false;
      });
    }

    filters[group][key] = true;

    this.setState({
      filters,
    });
  };

  fetchFullData = selectedDataset => {
    Papa.parse(datasets[selectedDataset].urls.full, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: results => {
        this.setState(prevState => ({
          data: {
            ...prevState.data,
            [selectedDataset]: {
              ...prevState.data[selectedDataset],
              full: results.data,
            },
          },
        }));
      },
    });
  };

  updateFilterGroup(event) {
    const { groupName, isChecked } = event;
    const { filters } = this.state;
    const filterGroup = filters[groupName];
    for (const key in filterGroup) {
      filterGroup[key] = isChecked;
    }
    this.setState({ filters });
  }

  /**
   * Check if we have already loaded the json for the selected dataset and fetch if we haven't.
   * @param {string} selectedDataset the slug of the new dataset to fetch. Should be an id with no spaces, rather than the title.
   */
  async fetchData(selectedDataset) {
    const { data, activeDataset } = this.state;

    // Do nothing if the selected dataset is already active.
    if (activeDataset === selectedDataset) {
      return;
    }

    // Have we already fetched this json? If not let's get it, add it to state, and update the active dataset
    // If we don't need to fetch the json again, just update the active dataset
    const existingData = data[selectedDataset] && data[selectedDataset].compressed;
    let newData;
    if (!existingData) {
      const res = await fetch(datasets[selectedDataset].urls.compressed);
      newData = await res.json();
      this.fetchFullData(selectedDataset);
    } else {
      newData = existingData;
    }

    // Finally we want to reset the filters to a fresh state
    // In order to setup our filters object, we need to get each key, along with all options for that key.
    // We can then create our filter object with all filters turned off by default
    const recordKeys = Object.keys(newData.records);

    const filters = {};
    recordKeys.forEach(key => {
      filters[key] = Object.create(null, {});
      const uniqueRecords = [...new Set(newData.records[key])];
      uniqueRecords.forEach(record => (filters[key][record] = true));
    });
    this.setState(prevState => ({
      isLoading: false,
      activeDataset: selectedDataset,
      data: {
        ...prevState.data,
        [selectedDataset]: {
          ...prevState.data[selectedDataset],
          compressed: newData,
        },
      },
      filters,
    }));
  }

  render() {
    const pageTitle = 'Explore The Data';
    const { isLoading, activeDataset, filters, data } = this.state;
    const datasetNames = Object.keys(datasets);

    // Render our charts if component is finished loading data
    if (!isLoading && data[activeDataset]) {
      const chartConfigs = datasets[activeDataset].chart_configs;
      const filterConfigs = datasets[activeDataset].filter_configs;

      // Setup our recordKeys
      const { records } = data[activeDataset].compressed;
      const recordKeys = Object.keys(records);
      const allUniqueRecords = {};
      recordKeys.forEach(key => (allUniqueRecords[key] = [...new Set(records[key])]).sort());

      // Filter our data, which will then be sent to Charts.js
      const filteredData = filterData(records, filters);
      const totalIncidents = filteredData.records[recordKeys[0]].length;

      // If full data is loaded, filter it using the indicies from the filtered
      // compressed data so that we can use it in the "Download (CSV)" button.
      let filteredFullData;
      if (data[activeDataset].full) {
        filteredFullData = data[activeDataset].full.filter(
          (_value, index) => !filteredData.removedRecordIndicies.includes(index)
        );
      }

      return (
        <React.Fragment>
          <Head>
            <title>Texas Justice Initiative | {pageTitle}</title>
          </Head>
          <Layout fullWidth>
            <FilterPanel
              dataLoaded
              filterConfigs={filterConfigs}
              handler={this.updateFilters}
              updateAll={this.updateFilterGroup}
              allUniqueRecords={allUniqueRecords}
              isChecked={filters}
              handleAutocompleteSelection={this.handleAutocompleteSelection}
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
                      <img src={datasets[datasetName].icon} alt={datasets[datasetName].name} />
                    </span>
                    <span className="btn--chart-toggle--text">{datasets[datasetName].name}</span>
                  </ChangeChartButton>
                ))}
              </ButtonsContainer>
              <DatasetDetails
                datasetName={datasets[activeDataset].name}
                datasetDescription={datasets[activeDataset].description}
                totalIncidents={totalIncidents.toLocaleString()}
                lastUpdated={datasets[activeDataset].lastUpdated}
                data={filteredFullData}
                fileName={`tji_${activeDataset}.csv`}
              />
              <ChartContainer>
                {Object.values(chartConfigs).map(chartConfig => (
                  <div key={chartConfig.group_by.name} className={`chart ${chartConfig.type}-chart`}>
                    <div className="chartContainer">
                      <h3 className="chart__group--label" data-tip={chartConfig.group_by.description}>
                        <ReactTooltip place="bottom" />
                        {chartConfig.group_by.name.replace(/_/g, ' ')}
                      </h3>
                      {chartConfig.type === 'bar' ? (
                        <BarChart
                          recordKeys={allUniqueRecords[chartConfig.group_by.name]}
                          records={filteredData.records[chartConfig.group_by.name]}
                          theme={theme}
                          incompleteYears={chartConfig.incompleteYears}
                        />
                      ) : (
                        <DoughnutChart
                          recordKeys={allUniqueRecords[chartConfig.group_by.name]}
                          records={filteredData.records[chartConfig.group_by.name]}
                        />
                      )}
                      {chartConfig.note && <ChartNote note={chartConfig.note} />}
                    </div>
                  </div>
                ))}
              </ChartContainer>
            </Main>
          </Layout>
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
          filterConfigs={null}
          handler={this.updateFilters}
          updateAll={this.updateFilterGroup}
          allUniqueRecords={null}
          isChecked={null}
          handleAutocompleteSelection={this.handleAutocompleteSelection}
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
                  <img src={datasets[datasetName].icon} alt={datasets[datasetName].name} />
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

const Main = styled.main`
  padding: 1em;
  width: 100%;
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
  }
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 1.33rem));
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;

  .chart {
    background: ${props => props.theme.colors.grayLightest};
    border: 1px solid ${props => props.theme.colors.grayLight};
    padding: 2rem;
  }

  .chartContainer {
    height: 100%;
  }

  .bar-chart,
  .doughnut-chart {
    grid-column: 1/4;
  }

  .bar-chart {
    .chart__plot {
      /* Fixes a bug in Firefox causing infinite drawing of bar chart */
      max-height: 600px;
    }
  }

  .chart__plot {
    width: 100%;
    height: 90%;
  }

  .chart__group--label {
    text-transform: uppercase;
    font-size: 2rem;
    text-align: center;
    color: ${props => props.theme.colors.black};
  }

  @media screen and (max-width: ${props => props.theme.medium}) {
    .bar-chart {
      .chart__plot {
        min-height: 300px;
      }
    }
  }

  @media screen and (min-width: ${props => props.theme.medium}) {
    .bar-chart {
      grid-column: 1/3;
    }

    .doughnut-chart {
      grid-column: auto;
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin: 2rem 0;

  button {
    width: 250px;
    margin: 1rem 2rem 1rem 0;
  }
`;

const ChangeChartButton = styled.button`
  display: flex !important;
  align-items: center;
  text-align: left !important;
  text-transform: capitalize !important;
  letter-spacing: 1px !important;

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

  @media screen and (min-width: ${props => props.theme.large}) {
    justify-content: space-evenly;
  }
`;
