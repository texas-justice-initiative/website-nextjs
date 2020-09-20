import React, { Component } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import CovidMap from '../../components/CovidMap';

const pageTitle = 'COVID-19 Officer Fatalities';

class Page extends Component {
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Texas Justice Initiative | {pageTitle}</title>
        </Head>
        <Layout>
          <Primary>
            <h1>{pageTitle}</h1>
            <CovidMap googleSheetsKey="1mOS1wggvyRUOpI-u2VabmnQ1yJPPEgOc2zdZjWxbAwQ" googleSheetsName="LEO Deaths"/>
          </Primary>
        </Layout>
      </React.Fragment>
    );
  }
}

export default Page;
