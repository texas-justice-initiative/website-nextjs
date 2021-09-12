/* eslint-disable react/no-danger */

import React from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import content from '../content/related-organizations.md';

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
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Primary>
      <Sidebar />
    </Layout>
  </React.Fragment>
);
export default About;
