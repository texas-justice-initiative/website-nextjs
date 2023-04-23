/* eslint-disable no-unused-vars */
/* eslint-disable guard-for-in, no-restricted-syntax, no-use-before-define, eqeqeq */

import { NextSeo } from 'next-seo';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DatasetDetails from '../../components/explore-the-data-page/DatasetDetails';
import FilterPanel from '../../components/explore-the-data-page/FilterPanel';
import HeroContent from '../../components/explore-the-data-page/HeroContent';
import Layout from '../../components/Layout';
import datasets from '../../data/datasets';
import useDataset from '../../hooks/use-dataset';
import filterData from '../../lib/filterDataset';
import { Chart } from '../../components/charts/chartsjs/Chart';
import { useRouter } from 'next/router';

export default function Explore(props) {
  const { dataset } = props;
  const router = useRouter();
  const {
    loading,
    data,
    fullData,
    filters,
    handleFilters,
    handleFilterGroup,
    handleAutocompleteSelection,
  } = useDataset(dataset);

  if (router.isFallback) {
    return (
      <>
        <Layout fullWidth>
          <Main>
            <HeroContent />
            <p>Loading...</p>
          </Main>
        </Layout>
      </>
    );
  }

  const chartConfigs = datasets[dataset].chart_configs;
  const filterConfigs = datasets[dataset].filter_configs;

  if (loading) {
    return null;
  }

  // Setup our recordKeys
  const { records } = data;
  const recordKeys = Object.keys(records);
  const allUniqueRecords = {};
  recordKeys.forEach((key) =>
    (allUniqueRecords[key] = [...new Set(records[key])]).sort()
  );

  // Filter our data, which will then be sent to Charts.js
  const filteredData = filterData(records, filters);

  const totalIncidents = filteredData.records[recordKeys[0]].length;

  // If full data is loaded, filter it using the indicies from the filtered
  // compressed data so that we can use it in the "Download (CSV)" button.
  let filteredFullData;
  if (fullData) {
    filteredFullData = fullData.filter(
      (_value, idx) => !filteredData.removedRecordIndicies.includes(idx)
    );
  }

  // Render our charts if component is finished loading data
  return (
    <>
      <NextSeo title={datasets[dataset].name} />
      <Layout fullWidth>
        <FilterPanel
          dataLoaded
          filterConfigs={filterConfigs}
          handler={handleFilters}
          updateAll={handleFilterGroup}
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
                datasetName={datasets[dataset].name}
                datasetDescription={datasets[dataset].description}
                totalIncidents={totalIncidents.toLocaleString()}
                lastUpdated={datasets[dataset].lastUpdated}
                data={filteredFullData}
                fileName={`tji_${dataset}.csv`}
              />
              <ChartContainer>
                {Object.values(chartConfigs).map((chartConfig) => (
                  <Chart
                    key={chartConfig.group_by.name}
                    keys={allUniqueRecords[chartConfig.group_by.name]}
                    values={filteredData.records[chartConfig.group_by.name]}
                    options={chartConfig}
                  />
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

export async function getStaticPaths() {
  return {
    paths: [
      { params: { dataset: 'officers-shot' } },
      { params: { dataset: 'civilians-shot' } },
      { params: { dataset: 'custodial-deaths' } },
    ],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      dataset: params.dataset,
    },
  };
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
