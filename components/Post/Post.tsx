import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import CloudinaryImage from '../CloudinaryImage';
import ReactMarkdown from 'react-markdown';
import styles from './Post.module.scss';
import Button from '@/components/Button';
import slugify from '../utils/slugify';
import { MarkdownFile } from 'app/blog/page';

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
  post: MarkdownFile;
};

function Post(props: PostProps) {
  const { post } = props;

  return (
    <li className="blog__post" key={post.slug}>
      <div className="blog__post__content">
        <h2>
          <Link
            href={{ pathname: `/post/${post.slug}` }}
            className="blog__post__read-more"
          >
            {post.attributes.title}
          </Link>
        </h2>
        <div className="blog__post__details">
          <span className="blog__post__date">
            {moment(post.attributes.date).format('MMMM D, YYYY')}
          </span>
          <div className="blog__post__authors">
            {formatAuthors(post.attributes.authors)}
          </div>
        </div>
        {post.markdownBody && (
          <div>
            <ReactMarkdown
              allowedElements={['p', 'strong', 'i', 'span']}
              className={styles['post__content']}
            >
              {post.markdownBody}
            </ReactMarkdown>
            <div style={{ marginTop: '16px' }}>
              <Link href={`/post/${post.slug}`} style={{ fontWeight: 'bold' }}>
                Read more
              </Link>
            </div>
          </div>
        )}
        {post.attributes.topics && (
          <div className="blog__post__topics">
            {post.attributes.topics.map((topic: string) => {
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
      {post.attributes.hero && (
        <div className="blog__post__image">
          <CloudinaryImage
            url={post.attributes.hero}
            alt={post.attributes.title}
            maxWidth={680}
          />
        </div>
      )}
    </li>
  );
}

export default Post;

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
