/* eslint-disable no-unused-vars, no-use-before-define, no-restricted-syntax, no-prototype-builtins */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import ChartLabel from 'chartjs-plugin-labels';
import Legend from './Legend';
import chartColors from '../../../data/chart_colors';

/**
 * Main function to manage raw JSON data and output an object ready for Chart.js
 * @param {array} recordKeys // lookup values to be used for labeling and matching records (see datasets.js[chart_config])
 * @param {array} records // Records which we will use to calculate totals and chart
 * See datasets.js for chart configuration
 */
const calculateData = (recordKeys, metaData) => {
  /**
   * Data has been grouped correctly, but age fields require additional work to display nicely.
   * At this point they are grouped by all ages individually (i.e. 0, 1, 2, 3, 4, etc.), which would
   * produce a horribly long list and a terrible chart.
   * We are going to group those ages (0-9, 10-19, etc.) to be more readable.
   */
  const preppedData = transformData(recordKeys, metaData);

  /**
   * Now that data is ready for charting, the last thing to do is sort it in descending
   * order. That ensures the proper use of our color palette.
   */
  const sortedData = sortData(preppedData);

  return {
    // Display the labels for this chart
    type: 'doughnut',
    responsive: true,
    labels: sortedData.sortedLabels,
    datasets: [
      {
        label: null,
        backgroundColor: chartColors,
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: 2,
        data: sortedData.sortedValues,
        precision: 0,
        showZero: true,
        fontSize: 14,
        fontColor: 'rgba(255,255,255,1)',
        // available value is 'default', 'border' and 'outside'
        position: 'default',
        overlap: false,
      },
    ],
  };
};

/**
 * Helper function for calculateDate().
 * Takes in raw records and calculates the total number of each record key.
 * This data is basically ready to be charted, but will be sent on to sortData() to make sure
 * it's in the correct order to best utilize our color palette.
 * @param {array} recordKeys // lookup values to be used for labeling and matching records (see datasets.js[chart_config])
 * @param {array} records // Records which we will use to calculate totals and chart
 */
const transformData = (recordKeys, records) => {
  // Initialize the object which will ultimately return all of our chart data
  const dataGroup = {};

  // Setup our function for filtering records so we can count totals
  const filterItems = (arr, query) => arr.filter(record => record === query);

  // Calculate the total # of incidents per data type
  // We are no longer removing values of 0, or negative numbers, since these have meaning in some cases
  const dataTotal = recordKeys.map(key => filterItems(records, key).length);

  recordKeys.forEach((key, index) => {
    dataGroup[key] = dataTotal[index];
  });

  // Return our grouped data, ready to be sorted
  return dataGroup;
};

/**
 * Helper function for calculateData(). This takes in our grouped data and sorts it in descending order.
 * This data is then converted into an object ready for Chart.js
 * @param {object} data // Object which contains label : total pairs (i.e. age: total deaths)
 */
const sortData = data => {
  const sortedData = [];
  const sortedDataForCharts = {
    sortedLabels: [],
    sortedValues: [],
  };

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      sortedData.push([key, data[key]]);
    }
  }

  sortedData.sort(function(a, b) {
    return b[1] - a[1];
  });
  sortedData.forEach(group => {
    sortedDataForCharts.sortedLabels.push(group[0].toLowerCase());
    sortedDataForCharts.sortedValues.push(group[1]);
  });
  return sortedDataForCharts;
};

/**
 * Object which contains options for charting.
 * See https://www.chartjs.org/docs/latest/general/options.html for options usage
 */
const options = {
  maintainAspectRatio: true,
  title: {
    display: false,
  },
  legend: {
    display: false,
  },
  scales: {},
  plugins: {
    labels: {
      render(args) {
        return `${args.percentage}%`;
      },
      precision: 0,
      showZero: true,
      fontSize: 14,
      fontColor: '#fff',
      // available value is 'default', 'border' and 'outside'
      position: 'default',
      overlap: false,
    },
  },
  layout: {
    padding: {
      left: 0,
      right: 0,
      top: 20,
      bottom: 20,
    },
  },
};

const DoughnutChart = props => {
  const { recordKeys, records } = props;

  // Setup data and legend for display
  const data = calculateData(recordKeys, records);

  // Do we even have data to chart? If not, just return an empty chart area with some text
  const recordTotals = data.datasets[0].data;
  const countData = recordTotals.reduce((acc, curr) => acc + curr);

  if (countData === 0) {
    return (
      <div className="doughnut-chart">
        <span className="doughnut-chart__no-data">NO DATA</span>
      </div>
    );
  }

  return (
    <div className="chart__plot">
      <Doughnut data={data} options={options} width={300} height={300} />
      <Legend chartFields={data.labels} />
    </div>
  );
};

export default DoughnutChart;

DoughnutChart.propTypes = {
  recordKeys: PropTypes.array.isRequired,
  records: PropTypes.array.isRequired,
};
