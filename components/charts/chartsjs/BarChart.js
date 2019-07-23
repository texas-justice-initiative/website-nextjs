import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';

// Chart Color Palette
const colors = {
  redHue1: '#FF8F8F', /* lighest red */
  redHue2: '#F95858', /* lighter red */
  redHue3: '#CE2727', /* light red */
  redHue4: '#AA1111', /* red */
  redHue5: '#721616', /* dark red */
  redHue6: '#490B0B', /* darkest red */

  blueHue1: '#83E5FF', /* lighest blue */
  blueHue2: '#64B8DD', /* lighter blue */
  blueHue3: '#348CB2', /* light blue */
  blueHue4: '#0B5D93', /* blue */
  blueHue5: '#04405B', /* dark blue */
  blueHue6: '#052C42', /* darkest blue */

  yellowHue1: '#FFFD00', /* lighest yellow */
  yellowHue2: '#FFD400', /* lighter yellow */
  yellowHue3: '#FFBC00', /* light yellow */
  yellowHue4: '#E2A203', /* yellow */
  yellowHue5: '#BC9800', /* dark yellow */
  yellowHue6: '#A57F08', /* darkest yellow */
};

const calculateData = (title, meta, metaData) => {
  const filterItems = (arr, query) => arr.filter(meta => meta === query);
  // Calculate the total # of deaths per data type
  // if value is null return 0 otherwise return total # of deaths for this data type
  const deathsByDataType = meta.map((metaValue, index) => (!metaValue ? 0 : filterItems(metaData, index).length));

  return {
    // Display the labels for this chart
    labels: meta,
    datasets: [
      {
        data: deathsByDataType,
        fill: false,
        backgroundColor: colors.blueHue4,
        lineTension: 0.1,
      },
    ],
  };
};

const DeathsByDataType = props => {
  const { title, meta, metaData } = props;
  const data = calculateData(title, meta, metaData);

  // Sort data descending in order to pull max value
  const sortedData = [...data.datasets[0].data].sort((a, b) => b - a);
  const scaleMax = sortedData[0];

  const options = {
    maintainAspectRatio: true,
    title: {
      display: false,
    },
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          suggestedMax: scaleMax,
          min: 0,
        }
      }]
    },
    layout: {
      padding: 20
    }
  };

  return (
    <div>
      <ChartTitle>{title}</ChartTitle>
      <Bar data={data} options={options} width="auto" />
    </div>
  );
};

export default DeathsByDataType;

const ChartTitle = styled.h3`
  color: ${props => props.theme.colors.black};
  text-align: center;
`;