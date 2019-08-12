import React from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
import ChartLabel from 'chartjs-plugin-labels';
import Legend from './Legend';

// General Chart Color Palette
const fullPalette = {
  redHue1: '#FF8F8F' /* lighest red */,
  redHue2: '#F95858' /* lighter red */,
  redHue3: '#CE2727' /* light red */,
  redHue4: '#AA1111' /* red */,
  redHue5: '#721616' /* dark red */,
  redHue6: '#490B0B' /* darkest red */,

  blueHue1: '#83E5FF' /* lighest blue */,
  blueHue2: '#64B8DD' /* lighter blue */,
  blueHue3: '#348CB2' /* light blue */,
  blueHue4: '#0B5D93' /* blue */,
  blueHue5: '#04405B' /* dark blue */,
  blueHue6: '#052C42' /* darkest blue */,

  yellowHue1: '#FFFD00' /* lighest yellow */,
  yellowHue2: '#FFD400' /* lighter yellow */,
  yellowHue3: '#FFBC00' /* light yellow */,
  yellowHue4: '#E2A203' /* yellow */,
  yellowHue5: '#BC9800' /* dark yellow */,
  yellowHue6: '#A57F08' /* darkest yellow */,
};

// Selected palette to be used in charts
const simplePalette = [
  fullPalette.blueHue4,
  fullPalette.redHue4,
  fullPalette.yellowHue4,
  fullPalette.blueHue2,
  fullPalette.redHue2,
  fullPalette.yellowHue2,
  fullPalette.blueHue6,
  fullPalette.redHue6,
  fullPalette.yellowHue6,
];

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
  return dataGroups;
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

  // Sort data descending in order to use correct color scheme
  deathsByDataType.sort((a, b) => b - a);
  return {
    // Display the labels for this chart
    type: 'doughnut',
    responsive: true,
    labels: Object.keys(dataForCharts),
    datasets: [
      {
        label: title,
        backgroundColor: simplePalette,
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: 2,
        data: Object.values(dataForCharts),
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
  console.log(data)

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