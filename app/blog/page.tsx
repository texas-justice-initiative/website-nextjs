import React from 'react';
import Blog from './blog';
import useMarkdownFiles from '@/hooks/use-posts';

export const metadata = {
  title: 'Blog',
  description:
    'Blogs about our criminal justice data, publications, analyses, and code.',
};

function Page() {
  const { data: posts } = useMarkdownFiles('./content/blog/posts/');
  const { data: topics } = useMarkdownFiles('./content/blog/topics/');
  const { data: authors } = useMarkdownFiles('./content/blog/authors/');
  return <Blog posts={posts} topics={topics} authors={authors} />;
}

export default Page;
