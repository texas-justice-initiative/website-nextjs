import Banner from '@/components/Banner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Roboto_Flex } from 'next/font/google';
import Providers from './providers';
const roboto = Roboto_Flex({ subsets: ['latin'] });
import './variables.css';
import './global.scss';
import Script from 'next/script';

export const metadata = {
  defaultTitle: 'Oversight for criminal justice data throughout Texas',
  title: 'Oversight of the Texas Criminal Justice System',
  titleTemplate: '%s | Texas Justice Initiative',
  description:
    'Nonprofit organization that collects, analyzes, publishes and provides oversight for criminal justice data throughout Texas.',
  openGraph: {
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
  },
  twitter: {
    handle: '@JusticeTexas',
    site: '@JusticeTexas',
    cardType: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
          strategy="afterInteractive"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
          `}
        </Script>
        <Providers>
          <Banner />
          <Header />
          <div>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
