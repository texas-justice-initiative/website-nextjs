/* eslint-disable react/destructuring-assignment */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { DefaultSeo } from 'next-seo';
import Banner from './Banner';
import Header from './Header';
import Footer from './Footer';
import Meta from './Meta';
import GlobalStyle from '../styles/GlobalStyle';
import theme from '../theme';

type PageProps = {
  children: React.ReactNode;
};

function Page({ children }: PageProps) {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Meta />
        <GlobalStyle />
        <Banner />
        <Header />
        <DefaultSeo
          title="Oversight of the Texas Criminal Justice System"
          titleTemplate="%s | Texas Justice Initiative"
          defaultTitle="Oversight for criminal justice data throughout Texas"
          description="Nonprofit organization that collects, analyzes, publishes and provides oversight for criminal justice data throughout Texas."
          openGraph={{
            type: 'website',
            locale: 'en_US',
            url: 'https://texasjusticeinitiative.org',
            images: [
              {
                url: 'https://texasjusticeinitiative.org/texas-justice-initiative-large.png',
                width: 1000,
                height: 636,
                alt: 'Texas Justice Initiative',
              },
            ],
          }}
          twitter={{
            handle: '@JusticeTexas',
            site: '@JusticeTexas',
            cardType: 'summary_large_image',
          }}
        />
        <div>{children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Page;
