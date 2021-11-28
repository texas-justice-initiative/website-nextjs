/* eslint-disable react/no-danger */

import React, { Component } from 'react';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import content from '../../content/publications/pre-conviction-deaths-in-texas-jails.md';

const TableauReport = dynamic(import('tableau-react'), { ssr: false });

const {
  html,
  attributes: { title },
} = content;

class Page extends Component {
  render() {
    return (
      <React.Fragment>
        <NextSeo title={title} />
        <Layout>
          <Primary>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <TableauReport url="https://public.tableau.com/views/TJI-BailReform_15794614539010/Deaths_Bail" />
          </Primary>
        </Layout>
      </React.Fragment>
    );
  }
}

export default Page;
