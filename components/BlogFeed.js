/* eslint-disable react/no-danger */

import React from 'react';
import Truncate from 'react-truncate';
import styled from 'styled-components';
import MarkdownIt from 'markdown-it';
import moment from 'moment';
import PropTypes from 'prop-types';
import Link from 'next/link';
import CloudinaryImage from './CloudinaryImage';
import Parser from './Parser';
import theme from '../theme';

export default function BlogFeed({ posts }) {
  const md = new MarkdownIt();

  if (posts === 'undefined') return null;

  return (
    <StyledBlogFeed>
      <div className="blog blog__container">
        <h2 className="blog__heading">TJI Blog</h2>
        <span className="blog__tagline">
          Where the TJI team posts blogs about our data, publications, analyses, and code.
        </span>
        <hr />
        {!posts && <div>No posts!</div>}
        <ul className="blog__posts">
          {posts &&
            posts.map(post => (
              <li className="blog__post" key={post.slug}>
                {post.attributes.hero && (
                  <div className="blog__post__image">
                    <CloudinaryImage
                      url={post.attributes.hero}
                      alt={post.attributes.title}
                      maxWidth={theme.newsItemImageWidthPixels}
                    />
                  </div>
                )}
                <div className="blog__post__content">
                  <h3>
                    <Link href={{ pathname: `/post/${post.slug}` }}>
                      <a className="blog__post__read-more" target="_blank" rel="noopener noreferrer">
                        {post.attributes.title}
                      </a>
                    </Link>
                  </h3>
                  <div className="blog__post__details">
                    <span className="blog__post__date">{moment(post.attributes.date).format('MMMM D, YYYY')}</span>
                    <div className="blog__post__authors">
                      By:&thinsp;
                      {post.attributes.authors.length > 1
                        ? post.attributes.authors.map(author => <span>{md.renderInline(author)}</span>)
                        : post.attributes.authors}
                    </div>
                  </div>
                  {post.markdownBody && (
                    <Truncate
                      lines={3}
                      ellipsis={
                        <span>
                          ... <a href={`/post/${post.slug}`}>Read more</a>
                        </span>
                      }
                    >
                      <Parser>{post.markdownBody}</Parser>
                    </Truncate>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </StyledBlogFeed>
  );
}

const StyledBlogFeed = styled.div`
  h2 {
    color: ${props => props.theme.colors.black};
    font-size: 4rem;
  }

  .blog__post__read-more {
    text-decoration: none;

    h3 {
      margin-bottom: 0;
    }
  }

  .blog__post__authors {
    margin: 1rem 0;
    display: flex;
    flex-flow: row wrap;

    span:not(:last-child)::after {
      content: ', \u2009';
    }
  }

  .blog__post__author,
  .blog__post__date {
    color: ${props => props.theme.colors.grayDark};
    font-size: ${props => props.theme.fontSizes.sm};
  }

  .blog__post__details {
    margin: 0.5rem 0;
  }

  .blog__tagline {
    color: ${props => props.theme.colors.grayDarkest};
    font-size: ${props => props.theme.fontSizes.md};
  }

  .blog__post {
    display: flex;
    flex-wrap: wrap;
    margin: 2rem 0;
    padding: 1rem 0;
    border-bottom: 1px solid ${props => props.theme.colors.grayLightest};

    @media screen and (min-width: ${props => props.theme.medium}) {
      flex-wrap: nowrap;
    }

    &:last-of-type {
      border-bottom-width: 0;
    }

    .blog__post__image {
      width: ${props => props.theme.newsItemImageWidthPixels}px;
      flex: 0 0 ${props => props.theme.newsItemImageWidthPixels}px;
    }

    .blog__post__content {
      flex: 0 1 auto;
      padding: 2rem 0;

      p {
        color: ${props => props.theme.colors.grayDarkest};
        margin-top: 0.5rem;
      }

      a {
        text-decoration: unset;
      }

      @media screen and (min-width: ${props => props.theme.medium}) {
        padding: 0 0 0 2rem;
      }
    }

    img {
      width: 100%;
      height: auto;
    }
  }
`;

BlogFeed.propTypes = {
  posts: PropTypes.any,
};
