/* eslint-disable react/no-danger */

import { NextSeo } from 'next-seo';
import Script from 'next/script';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import OfficerMap from '../../components/OfficerMap';
import content from '../../content/data-tools/covid-law-enforcement-deaths.md';

const {
  html,
  attributes: { title },
} = content;

export async function getStaticProps() {
  return {
    props: {
      googleMapsKey: process.env.TJI_MAPS_API,
    },
  };
}

function Page(props) {
  const { googleMapsKey } = props;
  return (
    <>
      <NextSeo title={title} />
      <Layout>
        <Primary>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&callback=resolveGoogleMapsPromise`}
          />
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

export default Page;

Page.propTypes = {
  googleMapsKey: PropTypes.string,
};
