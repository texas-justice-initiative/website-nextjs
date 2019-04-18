import React from 'react';
import Head from 'next/head';
import VictoryDeathsByYear from '../components/charts/victory/DeathsByYear';
import ChartJSDeathsByYear from '../components/charts/chartsjs/DeathsByYear';

const pageTitle = 'Chart Test';

const Index = () => (
  <div>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    {/* <div>
      <VictoryDeathsByYear title="Victory - Deaths By Year" />
    </div> */}
    <div>
      <ChartJSDeathsByYear title="ChartsJS - Deaths By Year" />
    </div>
  </div>
);

export default Index;
