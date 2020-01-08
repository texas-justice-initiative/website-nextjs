/* eslint-disable no-unused-vars, no-shadow */

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

class Meta extends React.Component {
  render() {
    const { props } = this;

    return (
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,700&display=swap" rel="stylesheet" />
        <title>{props => props.theme.siteTitle}</title>
      </Head>
    );
  }
}

export default Meta;

Meta.propTypes = {
  theme: PropTypes.object,
};
