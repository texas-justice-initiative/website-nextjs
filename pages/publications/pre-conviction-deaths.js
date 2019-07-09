import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Primary from '../../components/Primary';
import TableauReport from '../../components/TableauReport';

const pageTitle = 'Pre-Conviction Deaths in Texas Jails Since 2005';

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Primary>
      <h1>{pageTitle}</h1>

      <TableauReport url='https://public.tableau.com/views/TJI-BailReform/Deaths_Bail' />
    </Primary>
  </React.Fragment>
);
export default Page;
