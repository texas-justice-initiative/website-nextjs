import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Hero from '../components/Hero';
import DataTable from '../components/DataTable';
import content from '../content/interactive.md';
import Parser from '../components/Parser';

const {
  attributes: { title, description, usage, datasets },
} = content;

const md = require('markdown-it')({
  html: true,
});

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
    <Layout fullWidth flexColumn>
      <Hero title={title} description={description} />
      <Primary>
        <Parser>{md.render(usage)}</Parser>
        <DataTable datasets={datasets} />
      </Primary>
    </Layout>
  </React.Fragment>
);
export default Page;
