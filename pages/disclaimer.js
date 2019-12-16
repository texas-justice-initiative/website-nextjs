import React from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';

const pageTitle = 'Disclaimer';

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Texas Justice Initiative | {pageTitle}</title>
    </Head>
    <Layout>
      <Primary>
        <h1>{pageTitle}</h1>
        <p>
          The information contained in this website comes primarily from custodial death and officer-involved shooting
          datasets provided by the Texas Office of the Attorney General (OAG). These datasets were obtained via public
          information request.
        </p>
        <p>
          No independent verification of the records has taken place and this public database does not purport to be an
          accurate reflection of the OAG internal databases or of their truthfulness. If you believe an entry contains
          an error, please contact us.
        </p>
        <p>
          Slight changes have been made from the original databases to eliminate errors and to promote consistency. If
          you would like the original datasets, please contact us.
        </p>
        <p>
          By entering this website, you acknowledge that the Texas Justice Initiative is not responsible for any
          derivative work performed by or published by users of this public database.
        </p>
      </Primary>
      <Sidebar />
    </Layout>
  </React.Fragment>
);
export default Page;
