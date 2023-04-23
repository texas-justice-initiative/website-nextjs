import { React } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import CloudinaryImage from '../CloudinaryImage';
import TopicButton from '../TopicButton';

function formatAuthors(authors) {
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

function Post({ post }) {
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
        {/* {post.markdownBody && (
          <Truncate
            lines={3}
            width={0}
            ellipsis={
              <div>
                ... <a href={`/post/${post.slug}`}>Read more</a>
              </div>
            }
          >
            <Parser>{post.markdownBody}</Parser>
          </Truncate>
        )} */}
        {post.attributes.topics && (
          <div className="blog__post__topics">
            {post.attributes.topics.map((topic) => (
              <TopicButton topic={topic} key={topic} />
            ))}
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
