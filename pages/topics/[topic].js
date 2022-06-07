import { React, useState } from 'react';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Truncate from 'react-truncate';
import moment from 'moment';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import BlogFilters from '../../components/BlogFilters';
import Sidebar from '../../components/Sidebar';
import Paginate from '../../components/Paginate';
import Parser from '../../components/Parser';
import TopicButton from '../../components/TopicButton';
import slugify from '../../components/utils/slugify';

export const formatAuthors = authors => {
  switch (authors.length) {
    case 1:
      return authors[0];
    case 2:
      return `${authors[0]} and ${authors[1]}`;
    default:
      return `${authors.slice(0, authors.length - 1).join(', ')}, and ${authors[authors.length - 1]}`;
  }
};

/**
 * Todo: Improve SEO to use featured image
 */

export default function Topic({ posts, topic, authors }) {
  const [postsShown, setPostsShown] = useState(posts);

  if (!topic) return <></>;

  topic.slug = slugify(topic.title);
  const pageTitle = `See posts related to ${topic.title}`;

  /**
   * Handles updating active post array based upon selected authors
   */
  function handleSelectAuthors() {
    const authorsFilters = document.querySelectorAll('.authors-filters__filter');

    if (!authorsFilters) {
      return;
    }

    const selectedAuthors = Array.prototype.slice.call(authorsFilters).filter(author => author.checked === true);

    if (selectedAuthors.length === 0) {
      setPostsShown(posts);
      return;
    }

    const filteredPosts = posts.filter(post => {
      let postHasAuthor = false;

      selectedAuthors.forEach(author => {
        if (post.attributes.authors.indexOf(author.name) !== -1) {
          postHasAuthor = true;
        }
      });

      return postHasAuthor;
    });

    setPostsShown(filteredPosts);
  }

  return (
    <div>
      <NextSeo title={pageTitle} />
      <Layout>
        <Primary>
          <h1>Topic: {topic.title}</h1>
          <div>{topic.description && <p>{topic.description}</p>}</div>
          {postsShown && (
            <Paginate basePath={`/topics/${topic.slug}`}>
              {postsShown.map(post => (
                <li className="blog__post" key={post.slug}>
                  <div className="blog__post__content">
                    <h2>
                      <Link href={{ pathname: `/post/${post.slug}` }}>
                        <a className="blog__post__read-more">{post.attributes.title}</a>
                      </Link>
                    </h2>
                    <div className="blog__post__details">
                      <span className="blog__post__date">{moment(post.attributes.date).format('MMMM D, YYYY')}</span>
                      <div className="blog__post__authors">{formatAuthors(post.attributes.authors)}</div>
                    </div>
                    {post.markdownBody && (
                      <Truncate
                        lines={3}
                        width={0}
                        ellipsis={
                          <div>
                            ... <a href={`/post/${post.slug}`}>Read more</a>
                          </div>
                        }
                      >
                        <Parser>{post.markdownBody}</Parser>
                      </Truncate>
                    )}
                    {post.attributes.topics && (
                      <div className="blog__post__topics">
                        {post.attributes.topics.map(currentTopic => (
                          <TopicButton topic={currentTopic} key={currentTopic} />
                        ))}
                      </div>
                    )}
                  </div>
                </li>
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

  /**
   * Get author data
   */
  const authors = [];

  filteredPosts.forEach(post => authors.push(...post.attributes.authors));
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
      posts: filteredPosts,
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
