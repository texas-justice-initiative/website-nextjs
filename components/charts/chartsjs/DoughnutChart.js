import React from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import ChartLabel from 'chartjs-plugin-labels';
import Legend from './Legend';
import chartColors from '../../../data/chart_colors';

/**
 * Takes in raw data, merges together meta names and data, and groups ages together for improved readability
 */
const transformData = (name, meta, data) => {
  let dataGroups = {};
  if (name !== 'age_at_time_of_death') {
    meta.forEach((lookup, index) => {
      dataGroups[lookup] = data[index];
    });
  } else {
    dataGroups = {
      'Negative or Null': 0,
      'Under 18': 0,
      '18 to 29': 0,
      '30 to 39': 0,
      '40 to 49': 0,
      '50 to 59': 0,
      '60 and up': 0,
    };
    meta.forEach((lookup, index) => {
      const age = lookup;
      if (age < 0 || age === undefined || age === null) {
        dataGroups['Negative or Null'] += data[index];
      } else if (age < 18 && age > 0) {
        dataGroups['Under 18'] += data[index];
      } else if (age >= 18 && age <= 29) {
        dataGroups['18 to 29'] += data[index];
      } else if (age >= 30 && age <= 39) {
        dataGroups['30 to 39'] += data[index];
      } else if (age >= 40 && age <= 49) {
        dataGroups['40 to 49'] += data[index];
      } else if (age >= 50 && age <= 59) {
        dataGroups['50 to 59'] += data[index];
      } else if (age >= 60) {
        dataGroups['60 and up'] += data[index];
      }
    });
  }
  const sortedData = [];
  const sortedDataForCharts = {
    sortedLabels: [],
    sortedValues: [],
  }

  for (let key in dataGroups) {
    if (dataGroups.hasOwnProperty(key)) {
      sortedData.push([key, dataGroups[key]]);
    }
  }

  sortedData.sort(function(a,b) {
    return b[1]-a[1];
  });
  sortedData.map(group => {
    sortedDataForCharts.sortedLabels.push(group[0]);
    sortedDataForCharts.sortedValues.push(group[1]);
  })
  console.log(sortedDataForCharts.sortedLabels);
  return sortedDataForCharts;
}

const calculateData = (name, title, meta, metaData) => {
  const filterItems = (arr, query) => arr.filter(meta => meta === query);
  // Calculate the total # of deaths per data type
  // if value is null return 0 otherwise return total # of deaths for this data type
  const deathsByDataType = meta.map((metaValue, index) => (!metaValue ? 0 : filterItems(metaData, index).length));

  /**
   * Data has been grouped correctly, but age fields require additional work to display nicely.
   * At this point they are grouped by all ages individually (i.e. 0, 1, 2, 3, 4, etc.), which would
   * produce a horribly long list and a terrible chart.
   * We are going to group those ages (0-9, 10-19, etc.) to be more readable.
   */
  const dataForCharts = transformData(name, meta, deathsByDataType);

  return {
    // Display the labels for this chart
    type: 'doughnut',
    responsive: true,
    labels: dataForCharts.sortedLabels,
    datasets: [
      {
        label: title,
        backgroundColor: chartColors,
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: 2,
        data: dataForCharts.sortedValues,
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