import React, { Component } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';

const TableauReport = dynamic(import('tableau-react'), { ssr: false });

const pageTitle = 'Pre-Conviction Deaths in Texas Jails Since 2005';

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
              In this dashboard, the Texas Justice Initiative examines cases of individuals who have died in county and
              municipal jails before going to trial. When a person is arrested, a judge sets, or in some cases denies,
              the bail, an amount intended to ensure the individual shows up to court. The individual is held in jail
              until they pay the bail or go to trial. If an individual dies while they are in custody at a county or
              municipal jail – even if the death occurs pre-trial, before the individual was convicted of any crime –
              their death must be reported to the state’s Oﬃce of the Attorney General. TJI uses those reports to
              populate our{' '}
              <a href="http://texasjusticeinitiative.org/data/" target="_blank" rel="noopener noreferrer">
                Custodial Death Reports database
              </a>
            </p>
            <p>
              Below, we filtered our data for individuals who died in county and municipal jails before being convicted
              of charges or going to trial, and in some cases before even being charged. What kinds of charges do the
              individuals who die in jails pre-trial face? What kinds of deaths are most common at your local county
              jail? Where in Texas are pre-trial deaths the most frequent? We invite you to dig into our data using this
              dashboard, created by{' '}
              <a href="https://public.tableau.com/profile/james6137#!/" target="_blank" rel="noopener noreferrer">
                James Babyak
              </a>
              , on a laptop or desktop screen for best results.
            </p>
            <TableauReport url="https://public.tableau.com/views/TJI-BailReform_15794614539010/Deaths_Bail" />
          </Primary>
        </Layout>
      </React.Fragment>
    );
  }
}

export default Page;
