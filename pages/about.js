import React from 'react';
import Head from 'next/head';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';

const pageTitle = 'About Us';

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Primary>
      <h1>About Page</h1>
    </Primary>
    <Sidebar>I'm a sidebar!</Sidebar>
  </React.Fragment>
);
export default About;
