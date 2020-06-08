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

const title = 'Volunteer Survey';

const PageContent = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <p>
          Thank you for your interest in volunteering at Texas Justice Initiative. Please take a moment to fill out the
          form below so we can help find the right role for you.
        </p>
        <iframe
          title="Volunteer Interest Form"
          src="https://docs.google.com/forms/d/e/1FAIpQLSdsGpk6VunuQcTTgVCfD1p_cb8idSHEty5SoaO0LGwq3KXiQw/viewform?embedded=true"
          width={646}
          height={1864}
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
