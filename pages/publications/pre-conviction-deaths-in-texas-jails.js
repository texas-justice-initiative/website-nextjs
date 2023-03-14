/* eslint-disable react/no-danger */

import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import content from '../../content/publications/pre-conviction-deaths-in-texas-jails.md';

const {
  html,
  attributes: { title },
} = content;

function Page() {
  return (
    <>
      <NextSeo title={title} />
      <Layout>
        <Primary>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <iframe
            title={title}
            width="1366"
            height="758"
            src="https://public.tableau.com/views/TJI-BailReform_15794614539010/Deaths_Bail?:embed=y"
          />
        </Primary>
      </Layout>
    </>
  );
}

export default Page;
