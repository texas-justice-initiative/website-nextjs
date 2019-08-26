import React from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import ChartLabel from 'chartjs-plugin-labels';
import Legend from './Legend';
import chartColors from '../../../data/chart_colors';

/**
 * Main function to manage raw JSON data and output an object ready for Chart.js
 * @param {string} name // ID for matching data column.
 * @param {string} title // Title of this chart
 * @param {array} meta // lookup values to be used for labeling and matching records (see datasets.js[chart_config])
 * @param {object} metaData // Raw JSON records which we will use to calculate totals and chart
 * See datasets.js for chart configuration
 */
const calculateData = (name, title, meta, metaData) => {
  /**
   * Data has been grouped correctly, but age fields require additional work to display nicely.
   * At this point they are grouped by all ages individually (i.e. 0, 1, 2, 3, 4, etc.), which would
   * produce a horribly long list and a terrible chart.
   * We are going to group those ages (0-9, 10-19, etc.) to be more readable.
   */
  const preppedData = transformData(name, meta, metaData);

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
        label: title,
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
 * Takes in raw data, merges together meta names and data, and groups ages together for improved readability.
 * This data is basically ready to be charted, but will be sent on to sortData() to make sure
 * it's in the correct order to best utilize our color palette.
 * @param {string} name // a string used as an ID for a data column. Passed from datasets.js[chart_config]
 * @param {array} meta // An array of labels which are used for matching columns
 * @param {object} data // our main data object which contains record groups with their respective totals
 */
const transformData = (name, meta, data) => {
  // Initialize the object which will ultimately return all of our chart data
  let dataGroup = {};

  // Setup our function for filtering records so we can count totals
  const filterItems = (arr, query) => arr.filter(meta => meta === query);

  // Calculate the total # of incidents per data type
  // We are no longer removing values of 0, or negative numbers, since these have meaning in some cases
  const dataTotal = meta.map(metaValue => filterItems(data, metaValue).length);

  meta.forEach((lookup, index) => {
    dataGroup[lookup] = dataTotal[index];
  });
  /**
   * We still need to handle records that don't contain information for a specified field
   * This is provided in the JSON as a -1 value in the record (metaData)
   */
  const notProvided = data.filter(value => value === -1).length;
  if (notProvided > 0) {
    dataGroup['(not given)'] = notProvided;
  }
  // Return our grouped data, ready to be sorted
  return dataGroup;
}

/**
 * Helper function for calculateData(). This takes in our grouped data and sorts it in descending order.
 * This data is then converted into an object ready for Chart.js
 * @param {object} data // Object which contains label : total pairs (i.e. age: total deaths)
 */
const sortData = (data) => {
  const sortedData = [];
  const sortedDataForCharts = {
    sortedLabels: [],
    sortedValues: [],
  }

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      sortedData.push([key, data[key]]);
    }
  }

  sortedData.sort(function(a,b) {
    return b[1]-a[1];
  });
  sortedData.map(group => {
    sortedDataForCharts.sortedLabels.push(group[0].toLowerCase());
    sortedDataForCharts.sortedValues.push(group[1]);
  })
  return sortedDataForCharts;
}

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
    padding: 20,
  },
};

const DoughnutChart = props => {
  const { name, title, meta, metaData } = props;

  // Setup data and legend for display
  const data = calculateData(name, title, meta, metaData);

  return (
    <div className="doughnut-chart">
      <ChartTitle>{title}</ChartTitle>
      <Doughnut data={data} options={options} width={300} height={300} />
      <Legend chartFields={data.labels} />
    </div>
  );
};

export default DoughnutChart;

const ChartTitle = styled.h3`
  color: ${props => props.theme.colors.black};
  text-align: center;
`;