import React from 'react';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import chartColors from '../../../data/chart_colors';

const calculateData = (title, meta, metaData) => {
  const filterItems = (arr, query) => arr.filter(meta => meta === query);
  // Calculate the total # of deaths per data type
  // if value is null return 0 otherwise return total # of deaths for this data type
  const deathsByDataType = meta.map(metaValue => (!metaValue ? 0 : filterItems(metaData, metaValue).length));
  return {
    // Display the labels for this chart
    labels: meta,
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
      <ChartTitle>{title}</ChartTitle>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DeathsByDataType;

const ChartTitle = styled.h3`
  color: ${props => props.theme.colors.black};
  text-align: center;
`;
