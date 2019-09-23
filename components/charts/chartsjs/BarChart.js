/* eslint-disable no-unused-vars */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import chartColors from '../../../data/chart_colors';

/**
 * Main function to manage raw JSON data and output an object ready for Chart.js
 * @param {array} recordKeys // lookup values to be used for labeling and matching records (see datasets.js[chart_config])
 * @param {array} records // Records which we will use to calculate totals and chart
 * See datasets.js for chart configuration
 */
const calculateData = (recordKeys, records) => {
  // Sort records. As of now we only feed yearly data into bar charts, so the default sort is enough.
  recordKeys.sort();

  // Organize records into recordKey bins (i.e. each year), and calculate the total # of deaths per year
  // if value is null return 0 otherwise return total # of deaths for this year
  const filterItems = (arr, query) => arr.filter(record => record === query);
  const deathsByDataType = recordKeys.map(key => (!key ? 0 : filterItems(records, key).length));

  return {
    // Display the labels for this chart
    labels: recordKeys,
    datasets: [
      {
        data: deathsByDataType,
        fill: false,
        backgroundColor: chartColors[0],
        lineTension: 0.1,
      },
    ],
  };
};

const DeathsByDataType = props => {
  const { recordKeys, records } = props;
  const data = calculateData(recordKeys, records);

  // Do we even have data to chart? If not, just return an empty chart area with some text
  const recordTotals = data.datasets[0].data;
  const countData = recordTotals.reduce((acc, curr) => acc + curr);

  if (countData === 0) {
    return (
      <div className="bar-chart">
        <span className="bar-chart__no-data">NO DATA</span>
      </div>
    );
  }

  // Sort data descending in order to pull max value
  const sortedData = [...data.datasets[0].data].sort((a, b) => b - a);
  const scaleMax = sortedData[0];

  const options = {
    maintainAspectRatio: true,
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
    plugins: {
      labels: {
        render: 'value',
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMax: scaleMax,
            min: 0,
          },
        },
      ],
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <div className="chart__plot">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DeathsByDataType;

DeathsByDataType.propTypes = {
  recordKeys: PropTypes.array.isRequired,
  records: PropTypes.array.isRequired,
};
