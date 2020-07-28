import React from 'react';
import Head from 'next/head';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import Layout from '../components/Layout';
import countiesjson from '../data/texas-counties.json';
import { fullPalette } from '../data/chart_colors';

const deathsByCounty = [
  { county: 'Anderson', deaths: 7 },
  { county: 'Angelina', deaths: 16 },
  { county: 'Bexar', deaths: 2 },
  { county: 'Bowie', deaths: 10 },
  { county: 'Brazoria', deaths: 7 },
  { county: 'Dallas', deaths: 5 },
  { county: 'Dawson', deaths: 2 },
  { county: 'Fort Bend', deaths: 7 },
  { county: 'Galveston', deaths: 1 },
  { county: 'Grimes', deaths: 15 },
  { county: 'Harris', deaths: 5 },
  { county: 'Hidalgo', deaths: 1 },
  { county: 'Houston', deaths: 2 },
  { county: 'Jefferson', deaths: 4 },
  { county: 'Jones', deaths: 1 },
  { county: 'Lubbock', deaths: 1 },
  { county: 'Polk', deaths: 1 },
  { county: 'Potter', deaths: 3 },
  { county: 'Smith', deaths: 1 },
  { county: 'Tarrant', deaths: 17 },
  { county: 'Walker', deaths: 26 },
];

//determine min and max and set domain
//pass in function for scale?
const colorScale = scaleLinear()
  .domain([0, 26])
  .range([fullPalette.redHue1, fullPalette.redHue6]);

//create array of 6 buckets based on min and max
const colorLegend = [0, 5, 10, 15, 20, 25].map(i => ({ key: i, value: colorScale(i) }));

const CountyChloropleth = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | SANDBOX MAP</title>
    </Head>
    <Layout>
    <div className="Chloropleth">
      <div className="Chloropleth_legend">
      <Layout>
        {colorLegend.map(i => (
          <div
            style={{
              height: '50px',
              width: '50px',
              backgroundColor: i.value,
              color: '#fff',
            }}
          >
            {i.key}
          </div>
        ))}
      </Layout>
      </div>
      <div className="Chloropleth_map">
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
                const county = deathsByCounty.find(c => c.county === geo.properties.NAME);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="#FFF"
                    fill={county ? colorScale(county.deaths) : '#F5F4F6'}
                    style={{
                      default: {
                        outline: 'none',
                        opacity: 1,
                      },
                      hover: {
                        outline: 'none',
                        opacity: 0.75,
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
      </div>
    </div>
    </Layout>
  </React.Fragment>
);

export default CountyChloropleth;
