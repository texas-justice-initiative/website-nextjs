import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Layout';
import Primary from '../../components/Primary';
import CloudinaryImage from '../../components/CloudinaryImage';
import Parser from '../../components/Parser';
import { formatAuthors } from '../../components/BlogFeed';

export default function BlogPost({ attributes, markdownBody }) {
  if (!attributes) return <></>;
  return (
    <StyledBlogPost>
      <Layout>
        <Primary fullWidth>
          <article className="blog__post__container">
            <h1 className="blog__post__title">{attributes.title}</h1>
            <h2 className="blog__post__subtitle">{attributes.subtitle}</h2>
            <div className="blog__post__date">{moment(attributes.date).format('MMMM D, YYYY')}</div>
            <div className="blog__post__authors">{formatAuthors(attributes.authors)}</div>
            <div className="blog__post__image">
              {attributes.hero && <CloudinaryImage url={attributes.hero} alt={attributes.title} maxWidth={680} />}
            </div>
            <div className="blog__post__body">
              <Parser>{markdownBody}</Parser>
            </div>
          </article>
          <div className="blog__feed">
            <Link href="/blog">
              <a>
                <FontAwesomeIcon icon={faArrowCircleLeft} /> Back to TJI Blog
              </a>
            </Link>
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
    const data = keys.map(key => {
      const slug = key.replace(/^.*[\\/]/, '').slice(0, -3);

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
  .blog__post__container {
    max-width: 680px;
    margin: 0 auto;
  }

  .blog__post__title {
    border-bottom: 0;
    padding-bottom: 1rem;
  }

  .blog__post__subtitle {
    color: ${props => props.theme.colors.black};
    font-weight: ${props => props.theme.fontWeights.normal};
    padding-bottom: 1rem;
  }

  .blog__post__date,
  .blog__post__authors {
    font-style: italic;
  }

  .blog__post__authors {
    padding-bottom: 2rem;
    display: flex;
    flex-flow: row wrap;

    span:not(:last-child)::after {
      content: ', \u2009';
    }
  }

  .blog__post__body {
    blockquote {
      padding: 0 2rem;
      border-left: 5px solid ${props => props.theme.colors.grayLight};
    }

    img {
      max-width: 680px;
    }
  }

  .blog__feed {
    padding: 2rem;
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
