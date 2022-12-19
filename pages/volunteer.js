/* eslint-disable react/no-danger */

import React from 'react';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import VolunteerSurvey from '../components/VolunteerSurvey';
import content from '../content/volunteer.md';

const {
  html,
  attributes: { title },
} = content;

const PageContent = () => (
  <>
    <NextSeo title={title} />
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <Content dangerouslySetInnerHTML={{ __html: html }} />
        <VolunteerSurvey />
      </Primary>
      <Sidebar />
    </Layout>
  </>
);
export default PageContent;

const Content = styled.div`
  li {
    margin: 1em 0;
  }
`;
