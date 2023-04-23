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
  <>
    <NextSeo
      title={title}
      description="List of organizations providing criminal justice data in the United States."
      openGraph={{
        description:
          'List of organizations providing criminal justice data in the United States.',
      }}
    />
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Primary>
      <Sidebar />
    </Layout>
  </>
);
export default About;
