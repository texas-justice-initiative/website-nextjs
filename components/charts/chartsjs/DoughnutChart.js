import React from 'react';
import styled from 'styled-components';
import { Doughnut } from 'react-chartjs-2';

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

const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const DoughnutChart = props => {
  const { title, meta, metaData } = props;
  return (
    <div>
      <h2>{title}</h2>
      <Doughnut data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default DoughnutChart;