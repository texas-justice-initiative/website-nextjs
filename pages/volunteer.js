/* eslint-disable react/no-danger */

import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import content from '../content/volunteer.md';

const {
  html,
  attributes: { title },
} = content;

const PageContent = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <Content dangerouslySetInnerHTML={{ __html: html }} />
        <iframe
          title="Volunteer Interest Form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdsGpk6VunuQcTTgVCfD1p_cb8idSHEty5SoaO0LGwq3KXiQw/viewform?embedded=true"
          width={646}
          height={2000}
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
        >
          Loading…
        </iframe>
      </Primary>
      <Sidebar />
    </Layout>
  </React.Fragment>
);
export default PageContent;

const Content = styled.div`
  li {
    margin: 1em 0;
  }
`;
