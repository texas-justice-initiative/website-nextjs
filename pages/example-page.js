import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import Page from '../components/Page';

const pageTitle = 'Example Page';

const Example = props => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Para>Example Page</Para>
  </React.Fragment>
);

export default Example;

const Para = styled.p`
  /* Write normal CSS here */
  font-weight: bold;

  /* The base font-size is set to 10 so 1.3rem == 13px */
  font-size: 1.3rem;

  /* Use the theme values we set in the Page component */
  color: ${props => props.theme.blue};
`;
