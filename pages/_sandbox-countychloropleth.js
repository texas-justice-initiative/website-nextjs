import React from 'react';
import Head from 'next/head';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import Layout from '../components/Layout';
import countiesjson from '../data/texas-counties.json';
import { fullPalette } from '../data/chart_colors';

const deathsByCounty = [
  { name: 'Anderson', deaths: 7 },
  { name: 'Angelina', deaths: 16 },
  { name: 'Bexar', deaths: 2 },
  { name: 'Bowie', deaths: 10 },
  { name: 'Brazoria', deaths: 7 },
  { name: 'Dallas', deaths: 5 },
  { name: 'Dawson', deaths: 2 },
  { name: 'Fort Bend', deaths: 7 },
  { name: 'Galveston', deaths: 1 },
  { name: 'Grimes', deaths: 15 },
  { name: 'Harris', deaths: 5 },
  { name: 'Hidalgo', deaths: 1 },
  { name: 'Houston', deaths: 2 },
  { name: 'Jefferson', deaths: 4 },
  { name: 'Jones', deaths: 1 },
  { name: 'Lubbock', deaths: 1 },
  { name: 'Polk', deaths: 1 },
  { name: 'Potter', deaths: 3 },
  { name: 'Smith', deaths: 1 },
  { name: 'Tarrant', deaths: 17 },
  { name: 'Walker', deaths: 26 },
];

const colorScale = scaleLinear()
  .domain([0, 26])
  .range([fullPalette.redHue1, fullPalette.redHue6]);

const CountyChloropleth = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | SANDBOX MAP</title>
    </Head>
    <Layout>
      <ComposableMap
        style={{
          height: '800px',
          width: '800px',
        }}
        height={800}
        width={800}
        projection="geoMercator"
        projectionConfig={{
          center: [-100.1, 31.47],
          scale: [3300],
        }}
      >
        <Geographies geography={countiesjson}>
          {({ geographies }) =>
            geographies.map(geo => {

              const county = deathsByCounty.find((c) => c.name === geo.properties.NAME);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#FFF"
                  fill={county ? colorScale(county.deaths) : '#F5F4F6'}
                  style={{
                    default: {
                      outline: 'none',
                      opacity: 1
                    },
                    hover: {
                      outline: 'none',
                      opacity: .75
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </Layout>
  </React.Fragment>
);

export default CountyChloropleth;
