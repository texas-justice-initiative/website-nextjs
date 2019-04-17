import React from 'react';
import VictoryDeathsByYear from '../components/charts/victory/DeathsByYear';
import ChartJSDeathsByYear from '../components/charts/chartsjs/DeathsByYear';

const Index = () => (
  <div>
    {/* <div>
      <VictoryDeathsByYear title="Victory - Deaths By Year" />
    </div> */}
    <div>
      <ChartJSDeathsByYear title="ChartsJS - Deaths By Year" />
    </div>
  </div>
);

export default Index;
