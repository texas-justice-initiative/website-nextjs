import React from 'react';
import content from '@/content/thanks.md';
import Thanks from './thanks';

const {
  attributes: { title },
} = content;

export const metadata = {
  title: title,
  description: 'Let us know what you think of our work and share your ideas.',
};

function Page() {
  return <Thanks content={content} />;
}
export default Page;
