/* eslint-disable react/no-danger */

import React from 'react';
import Head from 'next/head';
import MarkdownIt from 'markdown-it';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import Parser from '../components/Parser';
import content from '../content/about-us.md';
import theme from '../theme';

/*
const {
  html,
  attributes: {
    title,
    mission,
    who: { title: whoTitle, people, governance, donors },
  },
} = content;

const md = new MarkdownIt();
*/

const title = 'Volunteer Opportunities';

const PageContent = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
    <Layout fullWidth>
      <Primary>
        <h1>{title}</h1>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdsGpk6VunuQcTTgVCfD1p_cb8idSHEty5SoaO0LGwq3KXiQw/viewform?embedded=true"
          width={1024}
          height={2000}
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
        >
          Loading…
        </iframe>
      </Primary>
    </Layout>
  </React.Fragment>
);
export default PageContent;
