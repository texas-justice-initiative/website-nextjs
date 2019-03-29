import React from 'react';
import Head from 'next/head';

const pageTitle = 'Template';

const Template = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <p>A Most Basic Template</p>;
  </React.Fragment>
);

export default Template;
