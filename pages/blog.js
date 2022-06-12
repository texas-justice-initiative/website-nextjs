import { React, useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
import moment from 'moment';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import BlogFilters from '../components/BlogFilters';
import Paginate from '../components/Paginate';
import Parser from '../components/Parser';
import TopicButton from '../components/TopicButton';

export async function getStaticProps() {
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
  })(require.context('../content/blog/posts', true, /\.md$/));

  const authors = (context => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      const slug = key.replace(/^.*[\\/]/, '').slice(0, -3);
      const value = values[index];
      return {
        attributes: value.attributes,
        slug,
      };
    });
    return data;
  })(require.context('../content/blog/authors', true, /\.md$/));

  const topics = (context => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      const slug = key.replace(/^.*[\\/]/, '').slice(0, -3);
      const value = values[index];
      return {
        attributes: value.attributes,
        slug,
      };
    });
    return data;
  })(require.context('../content/blog/topics', true, /\.md$/));

  return {
    props: {
      posts,
      topics,
      authors,
    },
  };
}

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

function Blog({ posts, authors, topics }) {
  const [postsShown, setPostsShown] = useState(posts);

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

  /**
   * Handles updating active post array based upon selected topics
   * TODO: can be refactored with above handler to a single function
   */
  function handleSelectTopics() {
    const topicsFilter = document.querySelectorAll('.topics-filters__filter');

    if (!topicsFilter) {
      return;
    }

    const selectedTopics = Array.prototype.slice.call(topicsFilter).filter(topic => topic.checked === true);

    if (selectedTopics.length === 0) {
      setPostsShown(posts);
      return;
    }

    const filteredPosts = posts.filter(post => {
      let postHasTopic = false;

      selectedTopics.forEach(topic => {
        if (post.attributes.topics.indexOf(topic.name) !== -1) {
          postHasTopic = true;
        }
      });

      return postHasTopic;
    });

    setPostsShown(filteredPosts);
  }

  return (
    <>
      <NextSeo
        title="Blog"
        description="Blogs about our criminal justice data, publications, analyses, and code."
        openGraph={{
          description: 'Blogs about our criminal justice data, publications, analyses, and code.',
        }}
      />
      <Layout>
        <Primary fullWidth>
          <h1>TJI Blog</h1>
          <div>
            <p>Where the TJI team posts blogs about our data, publications, analyses, and code.</p>
          </div>

          {postsShown && (
            <Paginate basePath="/blog">
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
                        {post.attributes.topics.map(topic => (
                          <TopicButton topic={topic} key={topic} />
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
          <BlogFilters
            authors={authors}
            handleSelectAuthors={handleSelectAuthors}
            topics={topics}
            handleSelectTopics={handleSelectTopics}
          />
        </Sidebar>
      </Layout>
    </>
  );
}

export default Blog;

Blog.propTypes = {
  posts: PropTypes.any,
  authors: PropTypes.array,
  topics: PropTypes.array,
};
