import React from 'react';
import { Bar as BarChart } from 'react-chartjs-2';

const Bar = props => {
  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Deaths By Year',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: deathsByYearData,
      },
    ],
  };
  return (
    <React.Fragment>
      <h2>{props.title}</h2>
      <BarChart data={chartData} />
    </React.Fragment>
  );
};

export default Bar;
