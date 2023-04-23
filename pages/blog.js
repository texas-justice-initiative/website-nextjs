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
  return posts.filter((post) => {
    let inTopic = false;
    let hasAuthor = false;

    if (topics.length !== 0) {
      topics.forEach((topic) => {
        if (post.attributes.topics.indexOf(topic.attributes.title) !== -1) {
          inTopic = true;
        }
      });
    } else {
      inTopic = true;
    }

    if (authors.length !== 0) {
      authors.forEach((author) => {
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

  function handleFilter(filtersEl, callback) {
    const filters = document.querySelectorAll(filtersEl);

    if (!filters) {
      return;
    }

    const activeFilters = Array.prototype.slice
      .call(filters)
      .filter((item) => item.checked === true)
      .map((item) => ({
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
    <>
      <NextSeo
        title="Blog"
        description="Blogs about our criminal justice data, publications, analyses, and code."
        openGraph={{
          description:
            'Blogs about our criminal justice data, publications, analyses, and code.',
        }}
      />
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
              {postsShown.map((post) => (
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
    </>
  );
}

export async function getStaticProps() {
  const posts = ((context) => {
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
      .sort(
        (a, b) =>
          new Date(moment(b.attributes.date).format('YYYY-MM-DD')) -
          new Date(moment(a.attributes.date).format('YYYY-MM-DD'))
      );

    return data;
  })(require.context('../content/blog/posts', true, /\.md$/));

  const authors = ((context) => {
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

  const topics = ((context) => {
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
