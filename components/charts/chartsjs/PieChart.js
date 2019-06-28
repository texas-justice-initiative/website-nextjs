import React from 'react';
import { Pie } from 'react-chartjs-2';

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
        label: title,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: deathsByDataType,
      },
    ],
  };
};

const DeathsByDataType = props => {
  const { title, meta, metaData } = props;
  const data = calculateData(title, meta, metaData);
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <Pie data={data} />
    </React.Fragment>
  );
};

export default DeathsByDataType;
