/* eslint-disable react/no-danger */

import React, { Component } from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import OfficerMap from '../../components/OfficerMap';
import content from '../../content/data-tools/covid-law-enforcement-deaths.md';

const {
  html,
  attributes: { title },
} = content;

class Page extends Component {
  render() {
    return (
      <>
        <NextSeo title={title} />
        <Layout>
          <Primary>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <OfficerMap
              googleSheetsKey="1mOS1wggvyRUOpI-u2VabmnQ1yJPPEgOc2zdZjWxbAwQ"
              googleSheetsName="LEO Deaths"
              allDeathsOnly
            />
          </Primary>
        </Layout>
      </>
    );
  }
}

export default Page;
