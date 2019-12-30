import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../components/Layout';

class Map extends React.Component {
  render() {
    const pageTitle = 'Maps of TJI Data';
    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | Map</title>
        </Head>
        <Layout fullWidth>
          <Main>
            <MapIframe src="https://map-viewer.texasjusticeinitiative.org/" />
          </Main>
        </Layout>
      </React.Fragment>
    );
  }
}

export default Map;

const Main = styled.main`
  padding: 1em;
  width: 100%;
  z-index: 1;

  @media screen and (min-width: ${props => props.theme.medium}) {
    position: relative;
    padding: 2em 4rem;
    width: calc(100% - 300px);
    flex-grow: 1;
  }
`;

const MapIframe = styled.iframe`
  height: calc(100vh - ${props => props.theme.desktopHeaderHeight});
  width: 100%;
  border: 0;

  @media (max-width: ${props => props.theme.medium}) {
    height: calc(100vh - ${props => props.theme.mediumHeaderHeight});
  }
`;
