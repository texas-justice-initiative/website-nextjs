import { React, useState } from 'react';
import { NextSeo } from 'next-seo';
import PropTypes from 'prop-types';
import moment from 'moment';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import BlogFilters from '../../components/BlogFilters';
import Sidebar from '../../components/Sidebar';
import Paginate from '../../components/Paginate';
import Post from '../../components/Post';
import slugify from '../../components/utils/slugify';

function filterPosts(posts, topic, authors) {
  return posts.filter((post) => {
    let inTopic = false;
    let hasAuthor = false;

    // eslint-disable-next-line no-prototype-builtins
    if (post.attributes.hasOwnProperty('topics')) {
      const postTopics = post.attributes.topics;
      inTopic = postTopics.indexOf(topic) !== -1;
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

/**
 * Todo: Improve SEO to use featured image
 */

export default function Topic({ posts, topic, authors }) {
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  if (!topic) return null;

  topic.slug = slugify(topic.title);
  const pageTitle = `See posts related to ${topic.title}`;

  const postsInTopic = filterPosts(posts, topic.title, filteredAuthors);

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
    <div>
      <NextSeo title={pageTitle} />
      <Layout>
        <Primary>
          <h1>Topic: {topic.title}</h1>
          <div>{topic.description && <p>{topic.description}</p>}</div>
          {postsInTopic && (
            <Paginate basePath={`/topics/${topic.slug}`}>
              {postsInTopic.map((post) => (
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
          />
        </Sidebar>
      </Layout>
    </div>
  );
}

export async function getStaticPaths() {
  const topicSlugs = ((context) => {
    const keys = context.keys();
    const data = keys.map((key) => {
      const slug = key.replace(/^.*[\\/]/, '').slice(0, -3);

      return slug;
    });
    return data;
  })(require.context('../../content/blog/topics', true, /\.md$/));

  const paths = topicSlugs.map((slug) => `/topics/${slug}`);

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ ...ctx }) {
  const { topic } = ctx.params;
  const content = await import(`../../content/blog/topics/${topic}.md`);

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
  })(require.context('../../content/blog/posts', true, /\.md$/));

  /**
   * Get author data
   */
  const authors = [];

  posts.forEach((post) => authors.push(...post.attributes.authors));
  const uniqueAuthors = [...new Set(authors)];

  const authorData = ((context) => {
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
      .filter(
        (author) => uniqueAuthors.indexOf(author.attributes.title) !== -1
      );

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

Topic.propTypes = {
  topic: PropTypes.object.isRequired,
  posts: PropTypes.array,
  authors: PropTypes.array,
};
