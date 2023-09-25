import React, { Suspense } from 'react';
import Blog from './blog';
import { allPosts, allAuthors, allTopics } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export const metadata = {
  title: 'Blog',
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

function Page() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );
  const authors = allAuthors;
  const topics = allTopics;

  return (
    <Suspense fallback={<Fallback />}>
      <Blog posts={posts} topics={topics} authors={authors} />
    </Suspense>
  );
}

export default Page;
