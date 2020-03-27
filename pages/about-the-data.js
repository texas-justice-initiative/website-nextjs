/* eslint-disable react/no-danger */

import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import content from '../content/about-the-data.md';
import styled from 'styled-components';

const {
  html,
  attributes: { title },
} = content;

const About = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <Content dangerouslySetInnerHTML={{ __html: html }} />
      </Primary>
      <Sidebar />
    </Layout>
  </React.Fragment>
);
export default About;

const Content = styled.div`
  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    padding: 3rem 0;
  }
`;
