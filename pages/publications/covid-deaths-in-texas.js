import React, { Component } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import CovidMap from '../../components/CovidMap';

const pageTitle = 'COVID Deaths in Texas';

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
            <p> The map provided on this page is updated monthly with the number of individuals who have died from COVID-19 while incarcerated in Texas. 
            </p>
            <CovidMap />
          </Primary>
        </Layout>
      </React.Fragment>
    );
  }
}

export default Page;
