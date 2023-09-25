'use client';

import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import CloudinaryImage from '../CloudinaryImage';
import ReactMarkdown from 'react-markdown';
import styles from './Post.module.scss';
import Button from '@/components/Button';
import slugify from '../utils/slugify';
import { Post as PostType } from 'contentlayer/generated';

function formatAuthors(authors: string[]) {
  switch (authors.length) {
    case 1:
      return authors[0];
    case 2:
      return `${authors[0]} and ${authors[1]}`;
    default:
      return `${authors.slice(0, authors.length - 1).join(', ')}, and ${
        authors[authors.length - 1]
      }`;
  }
}

export type PostProps = {
  post: PostType;
};

function Post(props: PostProps) {
  const { post } = props;

  return (
    <li className="blog__post">
      <div className="blog__post__content">
        <h2>
          <Link href={{ pathname: post.url }} className="blog__post__read-more">
            {post.title}
          </Link>
        </h2>
        <div className="blog__post__details">
          <span className="blog__post__date">
            {moment(post.date).format('MMMM D, YYYY')}
          </span>
          <div className="blog__post__authors">
            {formatAuthors(post.authors)}
          </div>
        </div>
        {post.body.html && (
          <div>
            <div
              className={styles['post__content']}
              dangerouslySetInnerHTML={{ __html: post.body.html }}
            />

            <div style={{ marginTop: '16px' }}>
              <Link href={post.url} style={{ fontWeight: 'bold' }}>
                Read more
              </Link>
            </div>
          </div>
        )}
        {post.topics && (
          <div className="blog__post__topics">
            {post.topics.map((topic: string) => {
              const slug = slugify(topic);
              return (
                <Button
                  key={topic}
                  as="link"
                  url={`/topics/${slug}`}
                  className={styles['post__topic-link']}
                >
                  {topic}
                </Button>
              );
            })}
          </div>
        )}
      </div>
      {post.hero && (
        <div className="blog__post__image">
          <CloudinaryImage url={post.hero} alt={post.title} maxWidth={680} />
        </div>
      )}
    </li>
  );
}

export default Post;

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
