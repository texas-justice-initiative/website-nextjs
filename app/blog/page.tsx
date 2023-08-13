import React from 'react';
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

function Page() {
  const posts: MarkdownFile[] = useMarkdownFiles('./content/blog/posts/').data;
  const topics: MarkdownFile[] = useMarkdownFiles(
    './content/blog/topics/'
  ).data;
  const authors: MarkdownFile[] = useMarkdownFiles(
    './content/blog/authors/'
  ).data;
  return <Blog posts={posts} topics={topics} authors={authors} />;
}

export default Page;
