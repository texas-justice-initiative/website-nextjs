import Head from 'next/head';
import React from 'react';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import Sidebar from '../../components/Sidebar';
import content from '../../content/publications.md';

const {
  html,
  attributes: { title },
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
        <h3>State of the Data</h3>
        <p>
          In the Texas Justice Initiative’s periodic newsletter, “State of the Data,” we feature our latest data,
          provide insights and more. Read previous editions:
        </p>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://mailchi.mp/9b565593c7a4/matching-grant-challenge-help-us-soar-221081"
          >
            Issue 1: October 2018
          </a>
        </p>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://mailchi.mp/8b29905c144e/state_of_the_data_december_2018"
          >
            Issue 2: December 2018
          </a>
        </p>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://mailchi.mp/973d370699d1/state_of_the_data_december_2018-316421"
          >
            Issue 3: February 2019
          </a>
        </p>
        <p>
          <a target="_blank" rel="noopener noreferrer" href="https://mailchi.mp/b7f6bf62b4b7/stateofthedata4">
            Issue 4: April 2019
          </a>
        </p>
        <p>
          <a target="_blank" rel="noopener noreferrer" href="https://mailchi.mp/01d503312561/stateofthedata4-382825">
            Issue 5: June 2019
          </a>
        </p>
        <p>
          <a target="_blank" rel="noopener noreferrer" href="https://mailchi.mp/f085563e4913/stateofthedata4-397117">
            Issue 6: August 2019
          </a>
        </p>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://mailchi.mp/259f91748e16/texas-justice-initiative-state-of-the-data-issue-7"
          >
            Issue 7: October 2019
          </a>
        </p>
        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://mailchi.mp/c10d931588b6/texas-justice-initiative-state-of-the-data-issue-480045"
          >
            Issue 8: December 2019
          </a>
        </p>
      </Sidebar>
    </Layout>
  </React.Fragment>
);
export default Page;
