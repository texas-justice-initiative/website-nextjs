import React, { Suspense } from 'react';
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

function Fallback() {
  return <p>Fetching</p>;
}

function Page({ params }: { params: { topic: string } }) {
  const posts: MarkdownFile[] = useMarkdownFiles('./content/blog/posts/').data;
  const authors: MarkdownFile[] = useMarkdownFiles(
    './content/blog/authors/'
  ).data;
  console.log({ posts, authors });

  return <p>Loading</p>;

  const topics: MarkdownFile[] = useMarkdownFiles(
    './content/blog/topics/'
  ).data;

  // const currentTopic = topics.filter((topic) => topic.slug === params.topic)[0];

  return (
    <Suspense fallback={<Fallback />}>
      <Topic posts={posts} topic={topics[0]} authors={authors} />
    </Suspense>
  );
}

export default Page;
