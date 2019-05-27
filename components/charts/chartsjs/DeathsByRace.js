import React from 'react';
import { Pie } from 'react-chartjs-2';

const calculateRaceData = (race, raceData) => {
  const filterItems = (arr, query) => arr.filter(race => race === query);
  // Calculate the total # of deaths per race
  // if value is null return 0 otherwise return total # of deaths for that race
  const deathsByRaceData = race.map((raceValue, index) => (!raceValue ? 0 : filterItems(raceData, index).length));

  return {
    // Display the labels for this chart
    labels: race,
    datasets: [
      {
        label: 'Deaths By Year',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: deathsByRaceData,
      },
    ],
  };
};

const DeathsByRace = props => {
  const { title, meta, raceData } = props;
  const data = calculateRaceData(meta, raceData);
  console.log(data);
  return (
    <React.Fragment>
      <h2>{title}</h2>
      <Pie data={data} />
    </React.Fragment>
  );
};

export default DeathsByRace;
