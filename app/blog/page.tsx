import React, { Suspense } from 'react';
import Blog from './blog';
import useMarkdownFiles from '@/hooks/use-posts';

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
  const posts: MarkdownFile[] = useMarkdownFiles('./content/blog/posts/').data;
  const topics: MarkdownFile[] = useMarkdownFiles(
    './content/blog/topics/'
  ).data;
  const authors: MarkdownFile[] = useMarkdownFiles(
    './content/blog/authors/'
  ).data;
  return (
    <Suspense fallback={<Fallback />}>
      <Blog posts={posts} topics={topics} authors={authors} />
    </Suspense>
  );
}

export default Page;
