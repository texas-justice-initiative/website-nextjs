import React from 'react';
import Topic from './topic';
import useMarkdownFiles from '@/hooks/use-posts';

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

function Page({ params }: { params: { topic: string } }) {
  const posts: MarkdownFile[] = useMarkdownFiles('./content/blog/posts/').data;
  const topics: MarkdownFile[] = useMarkdownFiles(
    './content/blog/topics/'
  ).data;
  const authors: MarkdownFile[] = useMarkdownFiles(
    './content/blog/authors/'
  ).data;

  const currentTopic = topics.filter((topic) => topic.slug === params.topic)[0];

  return <Topic posts={posts} topic={currentTopic} authors={authors} />;
}

export default Page;
