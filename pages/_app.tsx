import React from 'react';
import Page from '../components/Page';
import { Roboto_Flex } from 'next/font/google';

const roboto = Roboto_Flex({ subsets: ['latin'] });

export declare interface AppProps {
  Component: React.FunctionComponent;
  pageProps?: object | undefined;
}

export default function TJIApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <div className={roboto.className}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </div>
  );
}
