import React from "react";
import { Bar } from "react-chartjs-2";
import data from "../../../data/cdr_compressed";

const years = data.meta.lookups.year;
// console.log("Years: ", years);

const deaths = data.records.year;
// console.log("Deaths: ", deaths);

const filterItems = (arr, query) => {
  return arr.filter(year => year === query);
};

const deathsByYearData = years.map(
  (year, index) => filterItems(deaths, index).length
);

console.log("Deaths by Year Data: ", deathsByYearData);
const chartData = {
  labels: years,
  datasets: [
    {
      label: "Deaths By Year",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: deathsByYearData
    }
  ]
};

const DeathsByYear = props => {
  return (
    <React.Fragment>
      <h2>{props.title}</h2>
      <Bar data={chartData} />
    </React.Fragment>
  );
};

export default DeathsByYear;
