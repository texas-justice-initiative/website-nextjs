import React, { Component } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import CovidMap from '../../components/CovidMap';

const pageTitle = 'COVID-19 fatalities in Texas prisons and jails';

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
              As the novel coronavirus began to spread in early 2020, it was quickly determined that the disease that it
              causes, COVID-19, can be deadly to vulnerable populations, like{' '}
              <a href="https://jamanetwork.com/channels/health-forum/fullarticle/2764370">
                the approximately 2.2 million individuals
              </a>{' '}
              held in prisons and jails throughout the U.S.
              <p></p>
              The Texas Justice Initiative is tracking deaths of individuals related to COVID-19 in local, state and
              federal jails in prisons, displayed on the map below. Click on a cluster to zoom in on areas with multiple
              fatalities. Users can also click on the clusters to see details about the facilities and incidents.
              Additionally, use the filters below the map to view fatalities by age or facility type. For state prisons,
              compare the pattern of deaths in the filtered TJI map to the location of TDCJ facilities,{' '}
              <a href="https://www.tdcj.texas.gov/ks_facility.html">mapped here</a>.
              <p>
                Data sources*: custodial death reports filed with the Texas Office of the Attorney General, the{' '}
                <a href="https://www.bop.gov/resources/press_releases.jsp">Bureau of Prisons</a> news releases, the{' '}
                <a href="https://www.tdcj.texas.gov/covid-19/index2.html">Texas Department of Criminal Justice</a> news
                releases and data dashboard and daily tallies from the Texas Commission on Jail Standards from county
                jails.
              </p>
              <p>
                *A note: This data is self-reported, and several news outlets have reported that COVID-19 cases are
                undercounted in prisons and jails in Texas and throughout the U.S. (see:{' '}
                <a href="https://www.reuters.com/article/us-health-coronavirus-usa-jails-specailr/special-report-death-sentence-the-hidden-coronavirus-toll-in-u-s-jails-and-prisons-idUSKBN22U1V2">
                  Reuters
                </a>
                ,{' '}
                <a href="https://www.texasobserver.org/covid-19-texas-undercount-prisoners/">
                  <i>the Texas Observer</i>
                </a>
                ,{' '}
                <a href="https://www.themarshallproject.org/2020/04/24/tracking-the-spread-of-coronavirus-in-prisons">
                  <i>The Marshall Project</i>
                </a>
                ,{' '}
                <a href="https://theintercept.com/2020/05/28/coronavirus-federal-prison-halfway-houses/">
                  <i>The Intercept</i>
                </a>{' '}
                and the{' '}
                <a href="https://www.dallasnews.com/news/politics/2020/06/17/texas-coronavirus-totals-jump-thanks-to-1500-previously-excluded-state-prison-infections/">
                  <i>Dallas Morning News</i>
                </a>
                , to name a few). If you know of a fatality that is not on our map, or if you have any questions about
                our map,{' '}
                <a href="http://texasjusticeinitiative.org/about/?utm_source=Blog&utm_medium=Medium&utm_campaign=COVID19map&utm_content=aboutus_link">
                  please contact us
                </a>
                .
              </p>
            </p>
            <CovidMap />
          </Primary>
        </Layout>
      </React.Fragment>
    );
  }
}

export default Page;
