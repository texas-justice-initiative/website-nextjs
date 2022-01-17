import { React, useState } from 'react';
import styled from 'styled-components';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import Primary from '../components/Primary';
import Sidebar from '../components/Sidebar';
import BlogFeed from '../components/BlogFeed';
import BlogFilters from '../components/BlogFilters';

export async function getStaticProps() {
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
  })(require.context('../content/blog/posts', true, /\.md$/));

  const authors = (context => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      const value = values[index];
      return value.attributes;
    });
    return data;
  })(require.context('../content/blog/authors', true, /\.md$/));

  return {
    props: {
      posts,
      authors,
    },
  };
}

function Blog({ posts, authors }) {
  const [postsShown, setPostsShown] = useState(posts);

  const perPage = 5;
  const pageCount = Math.ceil(posts.length / perPage);

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
      const pagePath = `/blog?page=${pageNumber}`;

      pageLinks.push(
        <Link href={pagePath} key={pageNumber}>
          <a href={pagePath} style={{ textDecoration: 'none' }}>
            <PageNumber>{pageNumber}</PageNumber>
          </a>
        </Link>
      );
    }
  }

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
          <BlogFeed posts={postsShown} />
          {postsShown.length > 10 && <div style={{ textAlign: 'center' }}>{pageLinks}</div>}
        </Primary>
        <Sidebar>
          <BlogFilters authors={authors} handleSelectAuthors={handleSelectAuthors} />
        </Sidebar>
      </Layout>
    </>
  );
}

export default Blog;

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

Blog.propTypes = {
  posts: PropTypes.any,
  authors: PropTypes.any,
};
