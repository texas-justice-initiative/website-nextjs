import React from 'react';
import content from '@/content/about-the-data.md';
import AboutTheData from './about-the-data';

const {
  attributes: { title },
} = content;

export const metadata = {
  title: title,
  description:
    '"Texas Justice Initiative provides criminal justice data to the public in a user-friendly way that can be replicated by other states.',
};

function Page() {
  return <AboutTheData content={content} />;
}

export default Page;
