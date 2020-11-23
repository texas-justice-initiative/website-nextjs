import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Hero from '../components/Hero';
import DataTable from '../components/DataTable';
import content from '../content/interactive.md';

const {
  attributes: { title, description, datasets },
} = content;

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
    <Layout fullWidth>
      <Primary>
        <Hero title={title} description={description} />
        <DataTable datasets={datasets} />
      </Primary>
    </Layout>
  </React.Fragment>
);
export default Page;
