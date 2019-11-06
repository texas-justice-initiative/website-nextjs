import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

class Map extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | Map</title>
        </Head>
        <MapIframe src="http://tji-map-viewer.s3-website.us-east-2.amazonaws.com/#4.77/31.67/-100.43" />
      </React.Fragment>
    );
  }
}

export default Map;

const MapIframe = styled.iframe`
  height: calc(100vh - 153.375px);
  width: 100vw;
  border: 0;

  @media (max-width: ${props => props.theme.medium}) {
    height: calc(100vh - 90px);
  }
`;
