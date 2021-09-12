/* eslint-disable react/no-danger */

import React from 'react';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import content from '../content/about-the-data.md';

const {
  html,
  attributes: { title },
} = content;

const About = () => (
  <React.Fragment>
    <NextSeo title={title} />
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
