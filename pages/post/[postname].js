import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import CloudinaryImage from '../../components/CloudinaryImage';
import Parser from '../../components/Parser';
import theme from '../../theme';

export default function BlogPost({ attributes, markdownBody }) {
  if (!attributes) return <></>;

  return (
    <StyledBlogPost>
      <Layout>
        <Primary>
          <article>
            <h1>{attributes.title}</h1>
            <div className="blog__post__date">Published on {moment(attributes.date).format('MMMM D, YYYY')}</div>
            <div className="blog__post__image">
              {attributes.hero && (
                <CloudinaryImage
                  url={attributes.hero}
                  alt={attributes.title}
                  maxWidth={theme.newsItemImageWidthPixels}
                />
              )}
            </div>
            <p>
              By: <Parser>{attributes.authors}</Parser>
            </p>
            <div>
              <Parser>{markdownBody}</Parser>
            </div>
          </article>
          <hr />
          <div className="blog__feed">
            <Link href="/blog">Back to TJI Blog</Link> <FontAwesomeIcon icon={faArrowCircleRight} />
          </div>
        </Primary>
      </Layout>
    </StyledBlogPost>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params;
  const content = await import(`../../content/blog/posts/${postname}.md`);

  return {
    props: {
      attributes: content.attributes,
      markdownBody: content.html,
    },
  };
}

export async function getStaticPaths() {
  const blogSlugs = (context => {
    const keys = context.keys();
    const data = keys.map((key, index) => {
      const slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);

      return slug;
    });
    return data;
  })(require.context('../../content/blog/posts', true, /\.md$/));

  const paths = blogSlugs.map(slug => `/post/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

const StyledBlogPost = styled.div`
  h2 a {
    text-decoration: unset;
  }

  .blog__feed {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      font-size: ${props => props.theme.fontSizes.lg};
      text-decoration: unset;
      padding-right: 1rem;
    }

    svg path {
      fill: ${props => props.theme.colors.primaryBlue};
    }
  }
`;

BlogPost.propTypes = {
  attributes: PropTypes.object.isRequired,
  markdownBody: PropTypes.node.isRequired,
};
