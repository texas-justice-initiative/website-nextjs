import React, { useEffect } from 'react';
import Page from '../components/Page';
import { Roboto_Flex } from 'next/font/google';
import { useRouter } from 'next/router';
import * as gtag from '../components/GoogleAnalytics';
import Script from 'next/script';

const roboto = Roboto_Flex({ subsets: ['latin'] });

export declare interface AppProps {
  Component: React.FunctionComponent;
  pageProps?: object | undefined;
}

export default function TJIApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className={roboto.className}>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Page>
        <Component {...pageProps} />
      </Page>
    </div>
  );
}
