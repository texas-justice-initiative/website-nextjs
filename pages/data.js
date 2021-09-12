import React from 'react';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
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
    <NextSeo title={title} />
    <Layout fullWidth flexColumn>
      <Hero title={title} description={description} />
    </Layout>
    <Layout>
      <Primary>
        <Usage id="data-usage">
          <Parser>{md.render(usage)}</Parser>
        </Usage>
        <DataTable datasets={datasets} />
      </Primary>
    </Layout>
  </React.Fragment>
);
export default Page;

const Usage = styled.div`
  padding-bottom: 4rem;

  @media (min-width: ${props => props.theme.medium}) {
    padding-bottom: 0;
  }

  p {
    margin: 0;
  }
`;
