import React, { Component } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import OfficerMap from '../../components/OfficerMap';

const pageTitle = 'COVID-19 fatalities of law enforcement officers';

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
            <p>
              Much of the country began to self-quarantine in early 2020, staying home from school and work. But for law
              enforcement officers, going to work was not optional, and meant risking getting{' '}
              <a href="https://experience.arcgis.com/experience/783fae2f8c0c4759a3ae1ccb7ef51668/page/page_0/">
                infected with COVID-19
              </a>
              . As of early September, more than 100 officers nationwide had died after contracting the coronavirus,
              “more than gun violence, car accidents and all other causes combined,” the <i>Washington Post</i>{' '}
              <a href="https://www.washingtonpost.com/business/2020/09/02/coronavirus-deaths-police-officers-2020/">
                reported
              </a>
              .
            </p>
            <p>
              The Texas Justice Initiative is tracking deaths of officers who contracted COVID-19 in Texas, including
              officers who work for city, county, state and federal agencies, displayed on the map below. Click on a
              cluster to zoom in on areas with multiple fatalities. Users can also click on the clusters to see details
              about the facilities. Additionally, use the filters below the map to view fatalities by age or agency
              type.
            </p>
            <p>
              Data sources: the <a href="https://www.odmp.org/">Officer Down Memorial Page</a>, the Texas Department of
              Criminal Justice and local law enforcement agencies.
            </p>
            <OfficerMap
              googleSheetsKey="1mOS1wggvyRUOpI-u2VabmnQ1yJPPEgOc2zdZjWxbAwQ"
              googleSheetsName="LEO Deaths"
              allDeathsOnly
            />
          </Primary>
        </Layout>
      </React.Fragment>
    );
  }
}

export default Page;
