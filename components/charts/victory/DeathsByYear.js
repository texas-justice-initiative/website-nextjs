import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import data from "../../../data/cdr_compressed";

const years = data.meta.lookups.year;
// console.log("Years: ", years);

const deaths = data.records.year;
// console.log("Deaths: ", deaths);

const filterItems = (arr, query) => {
  return arr.filter(year => year === query);
};

// Create an array of objects with year and totalDeaths
// [{
//     "year": 2005,
//     "total": 545
//   },
//   {
//     "year": 2006,
//     "total": 657
//   }, ...

const deathsByYearData = years.map((year, index) => {
  return {
    year: new Date(year, 1, 1),
    totalDeaths: filterItems(deaths, index).length
  };
});

console.log(deathsByYearData);

const DeathsByYear = props => {
  return (
    <React.Fragment>
      <h2>{props.title}</h2>
      <VictoryChart domainPadding={20} scale={{ x: "time" }}>
        <VictoryAxis
          style={{
            tickLabels: {
              fontSize: 10,
              padding: 10,
              angle: -45
            }
          }}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar data={deathsByYearData} x="year" y="totalDeaths" />
      </VictoryChart>
    </React.Fragment>
  );
};

export default DeathsByYear;
