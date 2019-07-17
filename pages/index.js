import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Primary from '../components/Primary';

const pageTitle = 'Home Page';

const Index = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Primary>
    </Primary>
  </React.Fragment>
);

export default Index;
