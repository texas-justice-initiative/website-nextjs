import React from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';
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

const calculateData = (title, meta, metaData) => {
  const filterItems = (arr, query) => arr.filter(meta => meta === query);
  // Calculate the total # of deaths per data type
  // if value is null return 0 otherwise return total # of deaths for this data type
  const deathsByDataType = meta.map((metaValue, index) => (!metaValue ? 0 : filterItems(metaData, index).length));

  // Sort data descending in order to use correct color scheme
  deathsByDataType.sort((a, b) => b - a);

  return {
    // Display the labels for this chart
    type: 'doughnut',
    responsive: true,
    labels: meta,
    datasets: [
      {
        label: title,
        backgroundColor: simplePalette,
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: 2,
        data: deathsByDataType,
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
  const { title, meta, metaData } = props;

  // Setup data and legend for display
  const data = calculateData(title, meta, metaData);

  return (
    <div className="doughnut-chart">
      <ChartTitle>{title}</ChartTitle>
      <Doughnut data={data} options={options} width={300} height={300} />
      <Legend chartFields={meta} />
    </div>
  );
};

export default DoughnutChart;

const ChartTitle = styled.h3`
  color: ${props => props.theme.colors.black};
  text-align: center;
`;

const LegendItem = styled.span`
  display: block;
`;
