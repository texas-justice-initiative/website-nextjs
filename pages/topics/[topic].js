import React from 'react';
import { NextSeo } from 'next-seo';
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
import TopicButton from '../../components/TopicButton';

/**
 * Todo: Improve SEO to use featured image
 */

export default function Topic({ attributes }) {
  if (!attributes) return <></>;
  return (
    <div>
      <NextSeo title={attributes.topic} />
      <Layout>
        <Primary fullWidth>
          <div>Posts from topic</div>
          <div className="blog__feed">
            <Link href="/blog">
              <a>
                <FontAwesomeIcon icon={faArrowCircleLeft} /> Back to TJI Blog
              </a>
            </Link>
          </div>
        </Primary>
      </Layout>
    </div>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { topic } = ctx.params;
  const content = await import(`../../content/blog/topics/${topic}.md`);

  return {
    props: {
      attributes: content.attributes,
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
  attributes: PropTypes.object.isRequired,
};
