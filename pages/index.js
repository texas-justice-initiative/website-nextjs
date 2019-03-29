import React from 'react';
import Head from 'next/head';

const pageTitle = 'Home Page';

const Index = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <h1>Home Page</h1>
  </React.Fragment>
);

export default Index;
