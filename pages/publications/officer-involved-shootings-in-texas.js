/* eslint-disable react/no-danger */

import Head from 'next/head';
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
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
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
