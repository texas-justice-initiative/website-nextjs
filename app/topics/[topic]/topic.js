'use client';

import { React, useState } from 'react';
import { NextSeo } from 'next-seo';
import Layout from '../../../components/Layout';
import Primary from '../../../components/Primary';
import BlogFilters from '../../../components/BlogFilters';
import Sidebar from '../../../components/Sidebar';
import Paginate from '../../../components/Paginate';
import Post from '../../../components/Post';
import slugify from '../../../components/utils/slugify';
import filterPosts from '@/lib/filterPosts';

/**
 * Todo: Improve SEO to use featured image
 */

export default function Topic({ posts, topic, authors }) {
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  if (!topic) return null;

  const { title, description } = topic;

  const slug = slugify(title);
  const pageTitle = `See posts related to ${title}`;

  const postsInTopic = filterPosts(posts, [topic], filteredAuthors);

  function handleFilter(filtersEl, callback) {
    const filters = document.querySelectorAll(filtersEl);

    if (!filters) {
      return;
    }

    const activeFilters = Array.prototype.slice
      .call(filters)
      .filter((item) => item.checked === true)
      .map((item) => ({
        title: item.name,
      }));

    if (activeFilters.length === 0) {
      callback([]);
      return;
    }

    callback(activeFilters);
  }

  return (
    <div>
      <NextSeo title={pageTitle} />
      <Layout>
        <Primary>
          <h1>Topic: {title}</h1>
          <div>{description && <p>{description}</p>}</div>
          {postsInTopic && (
            <Paginate basePath={`/topics/${slug}`}>
              {postsInTopic.map((post) => (
                <Post key={slugify(post.title)} post={post} />
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
          />
        </Sidebar>
      </Layout>
    </div>
  );
}
