import React, { Suspense } from 'react';
import Topic from './topic';
import { allPosts, allAuthors, allTopics } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import slugify from '@/components/utils/slugify';

// TODO: Fix SEO data
export const metadata = {
  title: 'Topic',
  description:
    'Blogs about our criminal justice data, publications, analyses, and code.',
};

export type MarkdownFile = {
  attributes: {
    [key: string]: any;
  };
  markdownBody: string;
  slug: string;
};

function Fallback() {
  return <p>Fetching</p>;
}

function Page({ params }: { params: { topic: string } }) {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  const authors = allAuthors;
  const topic = allTopics.filter(
    (topic) => slugify(topic.title) === params.topic
  )[0];

  return (
    <Suspense fallback={<Fallback />}>
      <Topic posts={posts} topic={topic} authors={authors} />
    </Suspense>
  );
}

export default Page;
