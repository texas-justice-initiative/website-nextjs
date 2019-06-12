import React from 'react';
import { Bar } from 'react-chartjs-2';

const calculateYearData = (year, yearData) => {
  const filterItems = (arr, query) => arr.filter(year => year === query);
  // Calculate the total # of deaths per year
  // if value is null return 0 otherwise return total # of deaths for that year
  const deathsByYearData = year.map((yearValue, index) => (!yearValue ? 0 : filterItems(yearData, index).length));

  return {
    // Count from 2005 to get the label values
    labels: year.map((year, index) => index + 2005),
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
};

const DeathsByYear = props => {
  const { title, meta, yearData } = props;
  const data = calculateYearData(meta, yearData);
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <Bar data={data} />
    </React.Fragment>
  );
};

export default DeathsByYear;
