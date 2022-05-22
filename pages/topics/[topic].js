import { React, useState } from 'react';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import moment from 'moment';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import CloudinaryImage from '../../components/CloudinaryImage';
import Parser from '../../components/Parser';
import BlogFeed, { formatAuthors } from '../../components/BlogFeed';
import TopicButton from '../../components/TopicButton';
import BlogFilters from '../../components/BlogFilters';
import Sidebar from '../../components/Sidebar';

/**
 * Todo: Improve SEO to use featured image
 */

export default function Topic({ topic, posts }) {
  const perPage = 2;
  const pageCount = Math.ceil(posts.length / perPage);

  /**
   * TODO: There is a lot of duplicated code here and in blog.js
   * let's see what we can refactor to simplify and create a standard
   * feed for any archive type
   *
   * TODO: Fix pagination so it works correctly.
   */
  const router = useRouter();
  let { page } = router.query;
  page = parseInt(page);
  if (Number.isNaN(page) || page < 1 || page > pageCount) {
    page = 1;
  }

  const pageLinks = [];
  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    if (pageNumber === page) {
      pageLinks.push(
        <PageNumber className="current" key={pageNumber}>
          {pageNumber}
        </PageNumber>
      );
    } else {
      const pagePath = `/topics/${topic.title}/?page=${pageNumber}`;

      pageLinks.push(
        <Link href={pagePath} key={pageNumber}>
          <a href={pagePath} style={{ textDecoration: 'none' }}>
            <PageNumber>{pageNumber}</PageNumber>
          </a>
        </Link>
      );
    }
  }

  if (!topic) return <></>;

  const pageTitle = `See posts related to ${topic.title}`;

  return (
    <div>
      <NextSeo title={pageTitle} />
      <Layout>
        <Primary fullWidth>
          <BlogFeed posts={posts} />
          {posts.length > perPage && <div style={{ textAlign: 'center' }}>{pageLinks}</div>}
          {posts.length === 0 && <p>No posts found.</p>}
        </Primary>
      </Layout>
    </div>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { topic } = ctx.params;
  const content = await import(`../../content/blog/topics/${topic}.md`);

  const posts = (context => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      const slug = key.replace(/^.*[\\/]/, '').slice(0, -3);
      const value = values[index];
      return {
        attributes: value.attributes,
        markdownBody: value.html,
        slug,
      };
    });
    return data;
  })(require.context('../../content/blog/posts', true, /\.md$/));

  const filteredPosts = posts.filter(post => {
    // eslint-disable-next-line no-prototype-builtins
    if (post.attributes.hasOwnProperty('topics')) {
      const postTopics = post.attributes.topics;
      return postTopics.indexOf(content.attributes.title) !== -1;
    }

    return false;
  });

  return {
    props: {
      topic: content.attributes,
      posts: filteredPosts,
    },
  };
}

export async function getStaticPaths() {
  const topicSlugs = (context => {
    const keys = context.keys();
    const data = keys.map(key => {
      const slug = key.replace(/^.*[\\/]/, '').slice(0, -3);

      return slug;
    });
    return data;
  })(require.context('../../content/blog/topics', true, /\.md$/));

  const paths = topicSlugs.map(slug => `/topics/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

Topic.propTypes = {
  topic: PropTypes.object.isRequired,
  posts: PropTypes.array,
};

const PageNumber = styled.span`
  padding: 0.5em 0.8em;
  border: 1px solid ${props => props.theme.colors.grayLight};
  margin-left: -1px;
  color: ${props => props.theme.colors.primaryBlue};
  background-color: ${props => props.theme.colors.white};
  transition: all 0.35s;

  &.current,
  &:hover {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primaryBlue};
  }
`;
