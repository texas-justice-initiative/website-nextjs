import React from 'react';
import Page from '../components/Page';
import { Roboto } from 'next/font/google'

export default function TJIApp({ Component, pageProps }) {
  const roboto = Roboto({ subsets: ['latin'] })
  return (
    <Page className={roboto.className}>
      <Component {...pageProps} />
    </Page>
  )
}

export async function getInitialProps({ Component, ctx } ) {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
}