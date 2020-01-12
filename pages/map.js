import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';

class Map extends React.Component {
  render() {
    const { precheck } = this.props;
    const url = `https://map-viewer.texasjusticeinitiative.org/?precheck=${precheck}`;
    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | Map</title>
        </Head>
        <Layout fullWidth>
          <Main>
            <MapIframe src={url} />
          </Main>
        </Layout>
      </React.Fragment>
    );
  }
}

Map.propTypes = {
  precheck: PropTypes.string.isRequired,
};

Map.getInitialProps = async function(context) {
  const { precheck } = context.query;
  return { precheck: precheck || '' };
};

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
