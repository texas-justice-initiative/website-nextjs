import React from 'react';
import Head from 'next/head';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import Layout from '../components/Layout';
import BlockQuote from '../components/BlockQuote';
import countiesjson from '../data/texas-counties.json';

const Template = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | SANDBOX MAP</title>
    </Head>
    <Layout>
      <BlockQuote>SAMPLE COUNTY MAP</BlockQuote>
    </Layout>
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
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: '#ECEFF1',
                    stroke: '#000',
                    strokeWidth: 0.75,
                    outline: 'none',
                  },
                  hover: {
                    fill: '#CFD8DC',
                    stroke: '#607D8B',
                    strokeWidth: 1,
                    outline: 'none',
                  },
                  pressed: {
                    fill: '#FF5722',
                    stroke: '#607D8B',
                    strokeWidth: 1,
                    outline: 'none',
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </Layout>
  </React.Fragment>
);

export default Template;
