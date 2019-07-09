import React from 'react';
import Head from 'next/head';
import Primary from '../../components/Primary';

const pageTitle = 'Pre-Conviction Deaths in Texas Jails Since 2005';

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Primary>
      <h1>{pageTitle}</h1>
    </Primary>
  </React.Fragment>
);
export default Page;
