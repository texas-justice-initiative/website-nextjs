/* eslint-disable react/no-danger */

import { NextSeo } from 'next-seo';
import React from 'react';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import Sidebar from '../../components/Sidebar';
import content from '../../content/publications/officer-involved-shootings-in-texas.md';

const {
  html,
  attributes: { title, showSidebar },
} = content;

const Page = () => (
  <React.Fragment>
    <NextSeo title={title} />
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Primary>
      {showSidebar && <Sidebar />}
    </Layout>
  </React.Fragment>
);
export default Page;
