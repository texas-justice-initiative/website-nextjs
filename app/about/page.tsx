import React from 'react';
import content from '@/content/about-us.md';
import About from './about';

const {
  attributes: { title },
} = content;

export const metadata = {
  title: title,
  description:
    'Texas Justice Initiative was founded to increase transparency of state-reported criminal justice data.',
};

function Page() {
  return <About content={content} />;
}
export default Page;
