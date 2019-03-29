import React from 'react';
import Head from 'next/head';

const pageTitle = 'About Us';

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <h1>About Page</h1>
  </React.Fragment>
);
export default About;
