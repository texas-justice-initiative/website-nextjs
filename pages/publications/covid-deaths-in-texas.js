/* eslint-disable react/no-danger */

import React, { Component } from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import CovidMap from '../../components/CovidMap';
import content from '../../content/data-tools/covid-deaths-in-texas.md';

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
            <CovidMap
              googleSheetsKey="1mOS1wggvyRUOpI-u2VabmnQ1yJPPEgOc2zdZjWxbAwQ"
              googleSheetsName="Inmate Deaths"
              allDeathsOnly={false}
            />
          </Primary>
        </Layout>
      </React.Fragment>
    );
  }
}

export default Page;
