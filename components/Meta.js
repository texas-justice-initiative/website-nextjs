/* eslint-disable react/destructuring-assignment */

/* eslint-disable no-unused-vars, no-shadow */

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

const siteTitle = 'Texas Justice Initiative';

const Meta = (props) => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png" />
    <title>{(props) => props.theme.site.title}</title>
  </Head>
);

export default Meta;

Meta.propTypes = {
  theme: PropTypes.object,
};
