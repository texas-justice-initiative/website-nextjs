import React from 'react';
import content from '@/content/contact.md';
import Contact from './contact';

const {
  attributes: { title },
} = content;

export const metadata = {
  title: title,
  description: 'Let us know what you think of our work and share your ideas.',
};

function Page() {
  return <Contact content={content} />;
}
export default Page;
