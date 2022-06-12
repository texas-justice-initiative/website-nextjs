import { React, useState } from 'react';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import BlogFilters from '../../components/BlogFilters';
import Sidebar from '../../components/Sidebar';
import Paginate from '../../components/Paginate';
import Post from '../../components/loop/Post';
import slugify from '../../components/utils/slugify';

function filterPosts(posts, topic, authors) {
  return posts.filter(post => {
    let inTopic = false;
    let hasAuthor = false;

    // eslint-disable-next-line no-prototype-builtins
    if (post.attributes.hasOwnProperty('topics')) {
      const postTopics = post.attributes.topics;
      inTopic = postTopics.indexOf(topic) !== -1;
    }

    if (authors.length !== 0) {
      authors.forEach(author => {
        if (post.attributes.authors.indexOf(author.attributes.title) !== -1) {
          hasAuthor = true;
        }
      });
    } else {
      hasAuthor = true;
    }

    return inTopic && hasAuthor;
  });
}

/**
 * Todo: Improve SEO to use featured image
 */

export default function Topic({ posts, topic, authors }) {
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  if (!topic) return <></>;

  topic.slug = slugify(topic.title);
  const pageTitle = `See posts related to ${topic.title}`;

  const postsInTopic = filterPosts(posts, topic.title, filteredAuthors);

  /**
   * Handles updating active post array based upon selected authors
   */
  function handleSelectAuthors() {
    const authorsFilters = document.querySelectorAll('.authors-filters__filter');

    if (!authorsFilters) {
      return;
    }

    const selectedAuthors = Array.prototype.slice
      .call(authorsFilters)
      .filter(author => author.checked === true)
      .map(author => ({
        attributes: {
          title: author.name,
        },
      }));

    if (selectedAuthors.length === 0) {
      setFilteredAuthors([]);
      return;
    }

    setFilteredAuthors(selectedAuthors);
  }

  return (
    <div>
      <NextSeo title={pageTitle} />
      <Layout>
        <Primary>
          <h1>Topic: {topic.title}</h1>
          <div>{topic.description && <p>{topic.description}</p>}</div>
          {postsInTopic && (
            <Paginate basePath={`/topics/${topic.slug}`}>
              {postsInTopic.map(post => (
                <Post post={post} />
              ))}
            </Paginate>
          )}
        </Primary>
        <Sidebar>
          <BlogFilters authors={authors} handleSelectAuthors={handleSelectAuthors} />
        </Sidebar>
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

    const data = keys
      .map((key, index) => {
        const slug = key.replace(/^.*[\\/]/, '').slice(0, -3);
        const value = values[index];
        return {
          attributes: value.attributes,
          markdownBody: value.html,
          slug,
        };
      })
      .sort(function(a, b) {
        return (
          new Date(moment(b.attributes.date).format('YYYY-MM-DD')) -
          new Date(moment(a.attributes.date).format('YYYY-MM-DD'))
        );
      });

    return data;
  })(require.context('../../content/blog/posts', true, /\.md$/));

  /**
   * Get author data
   */
  const authors = [];

  posts.forEach(post => authors.push(...post.attributes.authors));
  const uniqueAuthors = [...new Set(authors)];

  const authorData = (context => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys
      .map((key, index) => {
        const slug = key.replace(/^.*[\\/]/, '').slice(0, -3);
        const value = values[index];
        return {
          attributes: value.attributes,
          slug,
        };
      })
      .filter(author => uniqueAuthors.indexOf(author.attributes.title) !== -1);

    return data;
  })(require.context('../../content/blog/authors', true, /\.md$/));

  return {
    props: {
      topic: content.attributes,
      posts,
      authors: authorData,
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
  authors: PropTypes.array,
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
