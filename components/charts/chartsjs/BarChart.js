/* eslint-disable no-unused-vars */

import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import chartColors from '../../../data/chart_colors';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

/**
 * Main function to manage raw JSON data and output an object ready for Chart.js
 * @param {array} recordKeys // lookup values to be used for labeling and matching records (see datasets.js[chart_config])
 * @param {array} records // Records which we will use to calculate totals and chart
 * See datasets.js for chart configuration
 */
const calculateData = (recordKeys, records, theme, incompleteYears) => {
  // Sort records. As of now we only feed yearly data into bar charts, so the default sort is enough.
  recordKeys.sort();

  // Organize records into recordKey bins (i.e. each year), and calculate the total # of deaths per year
  // if value is null return 0 otherwise return total # of deaths for this year
  const filterItems = (arr, query) => arr.filter((record) => record === query);
  const deathsByDataType = recordKeys.map((key) => (!key ? 0 : filterItems(records, key).length));

  // Change background color for incomplete years
  const thisYear = new Date().getFullYear();
  const colorPalette = recordKeys.map((year) => {
    if (year === thisYear || incompleteYears.includes(year)) {
      return theme.colors.gray;
    }
    return chartColors[0];
  });

  return {
    // Display the labels for this chart
    labels: recordKeys,
    datasets: [
      {
        data: deathsByDataType,
        fill: false,
        backgroundColor: colorPalette,
        lineTension: 0.1,
      },
    ],
  };
};

const DeathsByDataType = (props) => {
  const { recordKeys, records, theme, incompleteYears } = props;
  const data = calculateData(recordKeys, records, theme, incompleteYears);

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

  // Sort data descending in order to pull max value and set the y-axis max
  const sortedData = [...data.datasets[0].data].sort((a, b) => b - a);
  const scaleMax = Math.ceil(sortedData[0] * 1.1);

  const options = {
    maintainAspectRatio: false,
    title: {
      display: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
      },
    },
    scales: {
      y: {
        min: 0,
        suggestedMax: scaleMax,
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

  return (
    <div className="chart__plot">
      <Bar data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default DeathsByDataType;

DeathsByDataType.propTypes = {
  recordKeys: PropTypes.array.isRequired,
  records: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
  incompleteYears: PropTypes.arrayOf(PropTypes.number),
};

DeathsByDataType.defaultProps = {
  incompleteYears: [],
};
