import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import NewsFeed from '../components/NewsFeed';
import content from '../content/newsfeed.md';

const {
  attributes: { heading },
} = content;

const News = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {heading}</title>
    </Head>
    <Layout>
      <Primary>
        <NewsFeed page={1} perPage={20} />
      </Primary>
      <Sidebar />
    </Layout>
  </React.Fragment>
);
export default News;