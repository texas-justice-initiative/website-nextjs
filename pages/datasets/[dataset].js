/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in, no-restricted-syntax, no-use-before-define, eqeqeq */

import { NextSeo } from 'next-seo';
import Papa from 'papaparse';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BarChart from '../../components/charts/chartsjs/BarChart';
import ChartNote from '../../components/charts/chartsjs/ChartNote';
import DoughnutChart from '../../components/charts/chartsjs/DoughnutChart';
import DatasetDetails from '../../components/explore-the-data-page/DatasetDetails';
import FilterPanel from '../../components/explore-the-data-page/FilterPanel';
import HeroContent from '../../components/explore-the-data-page/HeroContent';
import Layout from '../../components/Layout';
import datasets from '../../data/datasets';
import theme from '../../theme';
import useDataset from '../../hooks/use-dataset';

export default function Explore(props) {
  const { dataset } = props;
  const { loading, data, fullData, filters, setFilters } = useDataset(dataset);

  /**
   * Updates state whenever a filter is changed
   */
  function updateFilters(event) {
    const { target } = event;
    const group = target.name;
    const key = group === 'year' ? parseInt(target.value) : target.value;
    const isChecked = target.checked;

    setFilters({
      ...filters,
      [group]: {
        ...filters[group],
        [key]: isChecked,
      },
    });
  }

  // TODO: this is currently not working, needs to be reworked with all filter functionality
  function handleAutocompleteSelection(event) {
    const { target } = event;
    const group = target.name;
    const key = target.value;
    const newFilters = filters;
    const allGroupFiltersAreChecked = !Object.values(filters[group]).includes(false);

    if (allGroupFiltersAreChecked) {
      Object.keys(newFilters[group]).forEach((groupKey) => {
        newFilters[group][groupKey] = false;
      });
    }

    newFilters[group][key] = true;

    setFilters(newFilters);
  }

  function updateFilterGroup(event) {
    const { groupName, isChecked } = event;
    const filterGroup = filters[groupName];
    for (const key in filterGroup) {
      filterGroup[key] = isChecked;
    }

    setFilters({
      ...filters,
      [groupName]: filterGroup,
    });
  }

  const datasetNames = Object.keys(datasets);
  let targetDataset = 0;

  const index = datasetNames.findIndex((name) => name === dataset);
  targetDataset = index !== -1 ? index : 0;

  const activeDataset = datasetNames[targetDataset];

  const chartConfigs = datasets[activeDataset].chart_configs;
  const filterConfigs = datasets[activeDataset].filter_configs;

  if (loading) {
    return null;
  }

  // Setup our recordKeys
  const { records } = data;
  const recordKeys = Object.keys(records);
  const allUniqueRecords = {};
  recordKeys.forEach((key) => (allUniqueRecords[key] = [...new Set(records[key])]).sort());

  // Filter our data, which will then be sent to Charts.js
  const filteredData = filterData(records, filters);

  const totalIncidents = filteredData.records[recordKeys[0]].length;

  // If full data is loaded, filter it using the indicies from the filtered
  // compressed data so that we can use it in the "Download (CSV)" button.
  let filteredFullData;
  if (fullData) {
    filteredFullData = fullData.filter((_value, idx) => !filteredData.removedRecordIndicies.includes(idx));
  }

  // Render our charts if component is finished loading data
  return (
    <>
      <NextSeo title={datasets[activeDataset].name} />
      <Layout fullWidth>
        <FilterPanel
          dataLoaded
          filterConfigs={filterConfigs}
          handler={updateFilters}
          updateAll={updateFilterGroup}
          allUniqueRecords={allUniqueRecords}
          isChecked={filters}
          handleAutocompleteSelection={handleAutocompleteSelection}
        />
        <Main>
          <HeroContent />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <DatasetDetails
                datasetName={datasets[activeDataset].name}
                datasetDescription={datasets[activeDataset].description}
                totalIncidents={totalIncidents.toLocaleString()}
                lastUpdated={datasets[activeDataset].lastUpdated}
                data={filteredFullData}
                fileName={`tji_${activeDataset}.csv`}
              />
              <ChartContainer>
                {Object.values(chartConfigs).map((chartConfig) => (
                  <div key={chartConfig.group_by.name} className={`chart ${chartConfig.type}-chart`}>
                    <div className="chartContainer">
                      <div className="chart__group--label-container" data-tip={chartConfig.group_by.description}>
                        <h3 className="chart__group--label">
                          <ReactTooltip place="bottom" />
                          {chartConfig.group_by.name.replace(/_/g, ' ')}
                        </h3>
                        {chartConfig.group_by.description && <span className="chart__group--description-icon">ⓘ</span>}
                      </div>
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
            </>
          )}
        </Main>
      </Layout>
    </>
  );
}

Explore.propTypes = {
  dataset: PropTypes.string,
};

export async function getStaticProps({ params }) {
  return {
    props: {
      dataset: params.dataset,
    },
  };
}

export async function getStaticPaths() {
  const datasetNames = Object.keys(datasets);
  const paths = datasetNames.map((datasetName) => ({ params: { dataset: datasetName } }));

  return { paths, fallback: false };
}

/**
 * Helper function that takes in the currently loaded data and the filters object and returns a new
 * data objected that has been filtered.
 * @param {obj} data // Coming from state.data
 * @param {obj} filters // Coming from state.filters
 */
function filterData(records, filters) {
  // Create an empty object which will become our final data object to be returned
  const filteredData = {
    records: {},
    removedRecordIndicies: [],
  };
  // Create an empty array which will contain the indices of all records to be filtered
  let filterIndices = [];

  // Loop through our filters
  const filterGroups = Object.keys(filters);

  filterGroups.forEach((filterGroup) => {
    // Add to our filtered data records which will we reduce later
    // This is important to ensure we aren't accidently modifying our object in state
    filteredData.records[filterGroup] = [...records[filterGroup]];

    // Are any filters active (true)? If so, let's apply filters for this group, otherwise we want to skip this group completely.
    const applyFilters = Object.values(filters[filterGroup]).includes(true);

    if (applyFilters) {
      // Loop through all different value options for each group
      const groupOptions = Object.keys(filters[filterGroup]);

      groupOptions.forEach((groupOption) => {
        if (filters[filterGroup][groupOption] === false) {
          // Reduce the selected groups records down to those that match our filter, saving the index of those records
          const matchedRecords = filteredData.records[filterGroup].reduce((acc, curr, index) => {
            /* record options that are true/false come through here as boolean data types,
              which was causing a type mismatch between the filter state and the record */
            const currentOption = typeof curr === 'boolean' ? curr.toString() : curr;

            if (currentOption == groupOption) {
              acc.push(index);
            }
            return acc;
          }, []);
          filterIndices = filterIndices.concat(matchedRecords);
        }
      });
    }
  });

  // At this point we have stored the index values of all records to be filtered in the array filterIndices
  // Now we want to remove those records and return a filtered dataset.
  const uniqueFilters = [...new Set(filterIndices)];
  const cleanedData = {
    records: {},
    removedRecordIndicies: uniqueFilters,
  };

  // Only process data further if we have any filters to apply, otherwise just return the original object.
  if (uniqueFilters.length > 0) {
    // Loop through groups first so that we can remove nulls more easily
    filterGroups.forEach((filterGroup) => {
      uniqueFilters.forEach((index) => {
        filteredData.records[filterGroup][index] = null;
      });
      cleanedData.records[filterGroup] = filteredData.records[filterGroup].filter((value) => value != null);
    });
    return cleanedData;
  }
  return filteredData;
}

const Main = styled.main`
  padding: 1em;
  width: 100%;

  @media screen and (min-width: ${(props) => props.theme.breakpoints.medium}) {
    position: relative;
    padding: 2em 4rem;
    width: calc(100% - 300px);
    flex-grow: 1;
  }
  .filtered-incidents {
    margin: 4rem 0;
    .incident-number {
      color: ${(props) => props.theme.colors.primaryRed};
    }
  }
`;

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, calc(33.33% - 1.33rem));
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;

  .chart {
    background: ${(props) => props.theme.colors.grayLightest};
    border: 1px solid ${(props) => props.theme.colors.grayLight};
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

  .chart__group--label-container {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;

    .chart__group--label {
      text-transform: uppercase;
      font-size: 2rem;
      text-align: center;
      color: ${(props) => props.theme.colors.black};
    }

    .chart__group--description-icon {
      margin-left: 0.6rem;
      font-size: 80%;
    }
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.medium}) {
    .bar-chart {
      .chart__plot {
        min-height: 300px;
      }
    }
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.medium}) {
    .bar-chart {
      grid-column: 1/3;
    }

    .doughnut-chart {
      grid-column: auto;
    }
  }
`;
