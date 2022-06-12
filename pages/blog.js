import { React, useState } from 'react';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import moment from 'moment';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import BlogFilters from '../components/BlogFilters';
import Paginate from '../components/Paginate';
import Post from '../components/loop/Post';

function filterPosts(posts, topics, authors) {
  return posts.filter(post => {
    let inTopic = false;
    let hasAuthor = false;

    if (topics.length !== 0) {
      topics.forEach(topic => {
        if (post.attributes.topics.indexOf(topic.attributes.title) !== -1) {
          inTopic = true;
        }
      });
    } else {
      inTopic = true;
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

export default function Blog({ posts, authors, topics }) {
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  const postsShown = filterPosts(posts, filteredTopics, filteredAuthors);

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

  /**
   * Handles updating active post array based upon selected authors
   */
  function handleSelectTopics() {
    const topicsFiters = document.querySelectorAll('.topics-filters__filter');

    if (!topicsFiters) {
      return;
    }

    const selectedTopics = Array.prototype.slice
      .call(topicsFiters)
      .filter(topic => topic.checked === true)
      .map(topic => ({
        attributes: {
          title: topic.name,
        },
      }));

    if (selectedTopics.length === 0) {
      setFilteredTopics([]);
      return;
    }

    setFilteredTopics(selectedTopics);
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
                <Post post={post} />
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

Blog.propTypes = {
  posts: PropTypes.any,
  authors: PropTypes.array,
  topics: PropTypes.array,
};
