import React from 'react';
import Donate from './donate';
import content from '@/content/donate.md';

const {
  attributes: { title },
} = content;

export const metadata = {
  metadataBase: new URL('https://texasjusticeinitiative.org'),
  title: title,
  description:
    'Texas Justice Initiative is entirely supported through public donations.',
  openGraph: {
    images: [
      {
        url: '/tji-donation-banner.png',
        width: 1348,
        height: 154,
        alt: 'Texas Justice Initiative - Seize the Data',
      },
    ],
  },
};

function Page() {
  return <Donate content={content} />;
}
export default Page;
