/* eslint-disable react/no-danger */

import React from 'react';
import Head from 'next/head';
import MarkdownIt from 'markdown-it';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import content from '../content/interactive.md';

const {
  html,
  attributes: { title, description },
} = content;

const md = new MarkdownIt();

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
    <Layout fullWidth>
      <Primary>
        <h1>{title}</h1>
      </Primary>
    </Layout>
  </React.Fragment>
);
export default Page;
