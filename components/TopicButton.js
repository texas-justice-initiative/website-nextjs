import { React } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const styles = {
  padding: '0.5rem 2rem',
  marginRight: '1rem',
  borderRadius: '3px',
  textDecoration: 'none',
};

/* todo: move to own file */
function makeSlug(str) {
  let slug = str.toLowerCase();
  slug = slug.replace(/[^a-z0-9]+/g, '-');
  slug = slug.replace(/^-+|-+$/g, '');
  return slug;
}

function TopicButton({ topic }) {
  const slug = makeSlug(topic);
  return (
    <Link href={`/topics/${slug}`}>
      <a className="topic-button btn--primary" style={styles}>
        {topic}
      </a>
    </Link>
  );
}

TopicButton.propTypes = {
  topic: PropTypes.string.isRequired,
};

export default TopicButton;
