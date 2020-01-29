/* eslint-disable react/no-danger */

import Head from 'next/head';
import React from 'react';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import Sidebar from '../../components/Sidebar';
import content from '../../content/publications.md';

const {
  html,
  attributes: { title, newslettersHeading, newslettersIntro, newsletters },
} = content;

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {title}</title>
    </Head>
    <Layout>
      <Primary>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Primary>
      <Sidebar>
        <h3>{newslettersHeading}</h3>
        <p>{newslettersIntro}</p>
        {newsletters.map((newsletter, k) => (
          <p key={k}>
            <a target="_blank" rel="noopener noreferrer" href={newsletter.url}>
              {newsletter.title}
            </a>
          </p>
        ))}
      </Sidebar>
    </Layout>
  </React.Fragment>
);
export default Page;
