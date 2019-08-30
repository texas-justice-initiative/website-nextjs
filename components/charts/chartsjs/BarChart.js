import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import chartColors from '../../../data/chart_colors';

/**
 * Main function to manage raw JSON data and output an object ready for Chart.js
 * @param {array} recordKeys // lookup values to be used for labeling and matching records (see datasets.js[chart_config])
 * @param {object} records // Raw JSON records which we will use to calculate totals and chart
 * See datasets.js for chart configuration
 */
const calculateData = (recordKeys, records) => {
  const filterItems = (arr, query) => arr.filter(record => record === query);
  // Calculate the total # of deaths per data type
  // if value is null return 0 otherwise return total # of deaths for this data type
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
    <div className="bar-chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DeathsByDataType;