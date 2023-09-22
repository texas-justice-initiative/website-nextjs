'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import Layout from '@/components/Layout';
import Primary from '@/components/Primary';
import Sidebar from '@/components/Sidebar';
import BlogFilters from '@/components/BlogFilters';
import Paginate from '@/components/Paginate';
import Post from '@/components/Post';
import React from 'react';
import { MarkdownFile } from './page';
import filterPosts from '@/lib/filterPosts';

export interface BlogProps {
  posts: MarkdownFile[];
  authors: MarkdownFile[];
  topics: MarkdownFile[];
}

export default function Blog(props: BlogProps) {
  const { posts, authors, topics } = props;
  const [filteredTopics, setFilteredTopics] = useState<{}[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<{}[]>([]);

  const postsShown = filterPosts(posts, filteredTopics, filteredAuthors);

  function handleFilter(
    filtersEl: string,
    callback: Dispatch<SetStateAction<{}[]>>
  ) {
    const filters = document.querySelectorAll(filtersEl);

    if (!filters) {
      return;
    }

    const activeFilters = Array.prototype.slice
      .call(filters)
      .filter((item: HTMLInputElement) => item.checked === true)
      .map((item: HTMLInputElement) => ({
        attributes: {
          title: item.name,
        },
      }));

    if (activeFilters.length === 0) {
      callback([]);
      return;
    }

    callback(activeFilters);
  }

  return (
    <Layout>
      <Primary fullWidth>
        <h1>TJI Blog</h1>
        <div>
          <p>
            Where the TJI team posts blogs about our data, publications,
            analyses, and code.
          </p>
        </div>

        {postsShown && (
          <Paginate basePath="/blog">
            {postsShown
              .sort(
                (
                  a: { attributes: { date: Date } },
                  b: { attributes: { date: Date } }
                ) =>
                  new Date(b.attributes.date).valueOf() -
                  new Date(a.attributes.date).valueOf()
              )
              .map((post) => (
                <Post key={post.slug} post={post} />
              ))}
          </Paginate>
        )}
      </Primary>
      <Sidebar>
        <BlogFilters
          authors={authors}
          handleSelectAuthors={() =>
            handleFilter('.authors-filters__filter', setFilteredAuthors)
          }
          topics={topics}
          handleSelectTopics={() =>
            handleFilter('.topics-filters__filter', setFilteredTopics)
          }
        />
      </Sidebar>
    </Layout>
  );
}
