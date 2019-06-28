import React from 'react';
import Head from 'next/head';

const siteTitle = 'Texas Justice Initiative';

const Meta = props => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.png" />
    <link href="https://fonts.googleapis.com/css?family=Raleway:400,700" rel="stylesheet" />
    <link rel="stylesheet" href="/static/museo.css" />
    <title>{props => props.theme.siteTitle}</title>
  </Head>
);

export default Meta;
