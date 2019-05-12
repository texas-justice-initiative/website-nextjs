import React from 'react';
import { Bar } from 'react-chartjs-2';

const DeathsByYear = props => {
  const { title, yearData } = props;
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <Bar data={yearData} />
    </React.Fragment>
  );
};

export default DeathsByYear;
