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
        <MapIframe src="https://map-viewer.texasjusticeinitiative.org/" />
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
    height: calc(100vh - ${props => props.theme.mediumHeaderHeight});
  }
`;
